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
    required: true,
    unique: true,
  },
  password: {
    type: String,
    select: false, // Don't include in queries by default
  },
  googleId: {
    type: String,
    unique: true,
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
}, {
  // Disable automatic _id generation since we're setting it manually
  _id: false,
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