import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IOrderItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color: string | null;
}

export interface IShippingAddress {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface IUserInfo {
  id: string;
  name: string;
  email: string;
}

export interface IOrder extends Document {
  user: IUserInfo;
  items: IOrderItem[];
  totalAmount: number;
  shippingAddress: IShippingAddress;
  paymentMethod: 'cod' | 'online';
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

interface IOrderModel extends Model<IOrder> {
  // Static methods can be added here if needed
}

const OrderItemSchema = new Schema<IOrderItem>({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  color: { type: String, default: null },
});

const ShippingAddressSchema = new Schema<IShippingAddress>({
  fullName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true, default: 'India' },
  phone: { type: String, required: true },
});

const UserInfoSchema = new Schema<IUserInfo>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const OrderSchema = new Schema<IOrder>({
  user: {
    type: UserInfoSchema,
    required: true,
  },
  items: {
    type: [OrderItemSchema],
    required: true,
    validate: {
      validator: function(items: IOrderItem[]) {
        return items.length > 0;
      },
      message: 'Order must contain at least one item',
    },
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  shippingAddress: {
    type: ShippingAddressSchema,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['cod', 'online'],
    default: 'cod',
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

// Index for better query performance
OrderSchema.index({ 'user.id': 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ createdAt: -1 });

const OrderModel: IOrderModel = (mongoose.models.Order as IOrderModel) || mongoose.model<IOrder, IOrderModel>('Order', OrderSchema);
export default OrderModel;
