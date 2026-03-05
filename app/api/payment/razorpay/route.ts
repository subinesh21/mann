import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import connectDB from '@/lib/db';
import OrderModel from '@/models/Order';
import { DeliveryCalculator } from '@/lib/delivery-calculator';
import { GSTCalculator } from '@/lib/gst-calculator';
import { InvoiceGenerator } from '@/lib/invoice-generator';
import { EmailService } from '@/lib/email-service';

// Initialize Razorpay with proper error handling
if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error('Razorpay credentials are not configured in environment variables');
}

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!
});

export async function POST(request: NextRequest) {
  try {
    const { 
      items, 
      customerInfo, 
      pincode, 
      paymentMethod 
    } = await request.json();

    // Validate required fields
    if (!items || !customerInfo || !pincode) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate items array
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Validate pincode
    const deliveryInfo = DeliveryCalculator.getDeliveryInfo(pincode);
    if (!deliveryInfo.isValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid pincode' },
        { status: 400 }
      );
    }

    // Calculate delivery cost
    const itemsTotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    const deliveryCost = DeliveryCalculator.calculateDeliveryCost(pincode, itemsTotal);

    // Calculate GST
    const gstCalculation = GSTCalculator.calculateWithDelivery(
      items.map((item: any) => ({
        id: String(item.id || item._id || item.productId),
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        category: item.category || 'homeware' // Default to 'homeware' if category not provided
      })),
      deliveryCost.finalCost
    );

    const totalAmount = gstCalculation.grandTotal;

    // Validate total amount
    if (totalAmount <= 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid order amount' },
        { status: 400 }
      );
    }

    // Create order in Razorpay
    const options = {
      amount: Math.round(totalAmount * 100), // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `order_${Date.now()}`,
      payment_capture: 1, // Auto-capture payments
      notes: {
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone,
        customer_name: customerInfo.fullName,
        items_count: items.length,
        pincode: pincode
      }
    };

    const order = await razorpay.orders.create(options);

    // Prepare order data for database
    const orderData = {
      orderId: order.id,
      customer: customerInfo,
      items: items.map((item: any) => ({
        productId: item.id || item._id || item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        category: item.category || 'homeware',
        total: item.price * item.quantity
      })),
      delivery: {
        pincode,
        cost: deliveryCost.finalCost,
        days: deliveryCost.deliveryDays,
        isFree: deliveryCost.isFree
      },
      pricing: {
        subtotal: gstCalculation.subtotal,
        deliveryCharges: deliveryCost.finalCost,
        gstAmount: gstCalculation.totalGST,
        totalAmount: totalAmount
      },
      payment: {
        method: paymentMethod,
        status: 'pending',
        razorpayOrderId: order.id
      },
      status: 'pending',
      createdAt: new Date()
    };

    // Save order to database
    const newOrder = await OrderModel.create({
      user: {
        id: customerInfo.userId || 'guest',
        name: customerInfo.fullName,
        email: customerInfo.email,
      },
      items: items.map((item: any) => ({
        productId: item.id || item._id || item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image || '/images/product-chai-cups.jpg',
        color: item.color || null,
      })),
      totalAmount: totalAmount,
      shippingAddress: {
        fullName: customerInfo.fullName,
        address: customerInfo.address,
        city: customerInfo.city,
        state: customerInfo.state,
        zipCode: customerInfo.zipCode,
        country: customerInfo.country || 'India',
        phone: customerInfo.phone.replace(/\D/g, ''), // Remove non-digits
      },
      paymentMethod: 'razorpay',
      status: 'pending',
      razorpayOrderId: order.id,
      subtotal: gstCalculation.subtotal,
      deliveryCharges: deliveryCost.finalCost,
      gstAmount: gstCalculation.totalGST,
      pincode: pincode,
      deliveryDays: deliveryCost.deliveryDays,
    });

    console.log('Order created successfully:', newOrder._id);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      orderData: {
        ...orderData,
        dbOrderId: newOrder._id,
      }
    });

  } catch (error: any) {
    console.error('Payment initiation error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to initiate payment',
        error: error.message 
      },
      { status: 500 }
    );
  }
}

// Verify payment webhook
export async function PUT(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, message: 'Missing payment verification details' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();
    
    // Find the order in database
    const order = await OrderModel.findOne({ razorpayOrderId: razorpay_order_id });
    
    if (!order) {
      return NextResponse.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      );
    }

    // Verify payment signature using crypto
    const crypto = require('crypto');
    const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest('hex');

    if (digest !== razorpay_signature) {
      // Update order status to failed
      await OrderModel.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { 
          status: 'failed',
          'payment.status': 'failed'
        }
      );
      
      return NextResponse.json(
        { success: false, message: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Fetch Razorpay order details to verify payment status
    const razorpayOrder = await razorpay.orders.fetch(razorpay_order_id);
    
    if (razorpayOrder.status !== 'paid') {
      return NextResponse.json(
        { success: false, message: 'Payment not completed' },
        { status: 400 }
      );
    }

    // Update order with payment details
    const updatedOrder = await OrderModel.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      { 
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: 'confirmed',
        'payment.status': 'completed',
        $set: { updatedAt: new Date() }
      },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, message: 'Failed to update order' },
        { status: 500 }
      );
    }
    
    // Generate invoice number
    const invoiceNumber = InvoiceGenerator.generateInvoiceNumber();
    const orderDate = InvoiceGenerator.formatDate(new Date());

    // Prepare order data for email
    const orderDataForEmail = {
      orderId: razorpay_order_id,
      orderDate,
      invoiceNumber,
      customer: {
        name: order.user.name,
        email: order.user.email,
        phone: order.shippingAddress.phone,
        address: order.shippingAddress.address,
        city: order.shippingAddress.city,
        state: order.shippingAddress.state,
        pincode: order.shippingAddress.zipCode
      },
      items: order.items,
      subtotal: order.subtotal,
      deliveryCharges: order.deliveryCharges,
      gstAmount: order.gstAmount,
      totalAmount: order.totalAmount,
      paymentMethod: 'razorpay',
      paymentId: razorpay_payment_id
    };

    // Send order confirmation email
    const emailSent = await EmailService.sendInvoiceEmail(
      orderDataForEmail.customer.email,
      orderDataForEmail.customer.name,
      invoiceNumber,
      orderDataForEmail.totalAmount
    );

    if (!emailSent) {
      console.warn('Failed to send order confirmation email');
    }
    
    console.log('Payment verified successfully for order:', razorpay_order_id);
    
    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      invoiceNumber,
      orderId: updatedOrder._id,
      orderStatus: updatedOrder.status
    });

  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Payment verification failed',
        error: error.message 
      },
      { status: 500 }
    );
  }
}