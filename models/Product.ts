import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['drinkware', 'tableware', 'storage', 'gardenware', 'one', 'two', 'three'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Image URL is required']
  },
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
ProductSchema.index({ category: 1 });
ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ isActive: 1 });

const ProductModel: Model<IProduct> = (mongoose.models.Product as Model<IProduct>) || 
  mongoose.model<IProduct, Model<IProduct>>('Product', ProductSchema);
export default ProductModel;