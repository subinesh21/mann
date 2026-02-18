'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);

  // Update localStorage when cart changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
      
      // Update cart count
      const count = cartItems.reduce((total, item) => total + item.quantity, 0);
      setCartCount(count);
      
      // Update cart total
      const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      setCartTotal(total);
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1, color = null) => {
    if (!product || !(product._id || product.productId || product.id)) {
      toast.error('Invalid product');
      return;
    }

    setCartItems(prevItems => {
      const productId = product._id || product.productId || product.id;
      // Check if item already exists in cart (with same color if applicable)
      const existingItemIndex = prevItems.findIndex(
        item => (item._id || item.productId || item.id) === productId && (color ? item.color === color : !item.color)
      );

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        toast.success('Cart updated successfully');
        return updatedItems;
      } else {
        // Add new item
        const newItem = {
          _id: productId,
          productId: productId,
          id: product.id || productId,
          name: product.name,
          price: product.price,
          image: product.image || '/images/product-chai-cups.jpg',
          quantity: quantity,
          color: color,
        };
        toast.success('Added to cart');
        return [...prevItems, newItem];
      }
    });

    // Open cart drawer when adding items
    setIsCartOpen(true);
  };

  const removeFromCart = (productId, color = null) => {
    setCartItems(prevItems => {
      const filtered = prevItems.filter(item => {
        const itemId = item._id || item.productId || item.id;
        if (color) {
          return !(itemId === productId && item.color === color);
        }
        return itemId !== productId;
      });
      
      if (filtered.length < prevItems.length) {
        toast.info('Item removed from cart');
      }
      
      return filtered;
    });
  };

  const updateQuantity = (productId, newQuantity, color = null) => {
    if (newQuantity < 1) {
      removeFromCart(productId, color);
      return;
    }

    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item => {
        const itemId = item._id || item.productId || item.id;
        if (color) {
          if (itemId === productId && item.color === color) {
            return { ...item, quantity: newQuantity };
          }
        } else if (itemId === productId && !item.color) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      
      toast.success('Cart updated');
      return updatedItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info('Cart cleared');
  };

  const placeOrder = async (orderData, userData) => {
    try {
      // Validate order data
      if (!orderData.items || orderData.items.length === 0) {
        toast.error('Cannot place order with empty cart');
        return false;
      }
  
      if (!userData || !userData.id) {
        toast.error('Please login to place order');
        return false;
      }
  
      // Validate shipping address
      const { shippingAddress } = orderData;
      if (!shippingAddress.fullName || !shippingAddress.address || !shippingAddress.city || 
          !shippingAddress.state || !shippingAddress.zipCode || !shippingAddress.phone) {
        toast.error('Please fill in all shipping details');
        return false;
      }
  
      // Clean phone number
      const cleanPhone = shippingAddress.phone.replace(/\D/g, '');
      if (cleanPhone.length !== 10) {
        toast.error('Phone number must be 10 digits');
        return false;
      }
  
      // Format order data for API
      const orderPayload = {
        user: {
          id: userData.id,
          name: userData.name,
          email: userData.email,
        },
        items: orderData.items.map(item => ({
          _id: item._id || item.id,
          productId: item._id || item.id,
          name: item.name,
          price: Number(item.price),
          image: item.image || '/images/product-chai-cups.jpg',
          quantity: Number(item.quantity),
          color: item.color || null,
        })),
        totalAmount: Number(orderData.totalAmount),
        shippingAddress: {
          fullName: shippingAddress.fullName,
          address: shippingAddress.address,
          city: shippingAddress.city,
          state: shippingAddress.state,
          zipCode: shippingAddress.zipCode,
          country: shippingAddress.country || 'India',
          phone: cleanPhone,
        },
        paymentMethod: orderData.paymentMethod || 'cod',
      };
  
      console.log('Placing order with payload:', JSON.stringify(orderPayload, null, 2));
  
      // Send order to API
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });
  
      const data = await response.json();
      console.log('Order API response:', data);
  
      if (!response.ok) {
        console.error('Order API error:', data);
        toast.error(data.message || 'Failed to place order');
        return false;
      }
  
      console.log('Order placed successfully:', data);
  
      // Clear cart after successful order
      clearCart();
      toast.success('Order placed successfully!');
      
      return true;
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Network error. Please try again.');
      return false;
    }
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      cartTotal,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      placeOrder,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}