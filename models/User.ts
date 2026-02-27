import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  // Allow string IDs from Firebase
  _id: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    sparse: true, // Allow null values for mobile-only users
  },
  mobile: {
    type: String,
    sparse: true, // Allow null values for email-only users
  },
  password: {
    type: String,
    select: false, // Don't include in queries by default
  },
  googleId: {
    type: String,
    sparse: true, // Allow null values
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  shippingAddress: {
    fullName: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: {
      type: String,
      default: 'India',
    },
    phone: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  otp: {
    type: String,
    select: false,
  },
  otpExpires: {
    type: Date,
    select: false,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
}, {
  // Disable automatic _id generation since we're setting it manually
  _id: false,
  // Disable auto indexing to prevent conflicts
  autoIndex: false,
});

// Add comparePassword method
userSchema.methods.comparePassword = async function(candidatePassword: string) {
  if (!this.password) return false;
  
  // For now, we'll do a simple comparison
  // In production, you should use bcrypt or similar
  return candidatePassword === this.password;
};

// Create the model
const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

export default UserModel;