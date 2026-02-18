import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  author: string;
  tags: string[];
  isPublished: boolean;
  publishedAt: Date;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>({
  title: {
    type: String,
    required: [true, 'Blog title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Blog content is required']
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    maxlength: [300, 'Excerpt cannot exceed 300 characters']
  },
  image: {
    type: String,
    required: [true, 'Featured image is required']
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date,
    default: null
  },
  views: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

// Pre-save middleware to generate slug from title
BlogSchema.pre('save', function(next) {
  if (this.isModified('title') && this.title) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
  
  if (this.isModified('isPublished') && this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  next();
});

// Index for better query performance
BlogSchema.index({ slug: 1 });
BlogSchema.index({ isPublished: 1 });
BlogSchema.index({ tags: 1 });
BlogSchema.index({ publishedAt: -1 });

const BlogModel: Model<IBlog> = (mongoose.models.Blog as Model<IBlog>) || 
  mongoose.model<IBlog, Model<IBlog>>('Blog', BlogSchema);
export default BlogModel;