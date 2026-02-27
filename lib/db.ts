import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

console.log('Environment MONGODB_URI:', MONGODB_URI ? 'SET' : 'NOT SET');
console.log('Full URI value:', MONGODB_URI);

if (!MONGODB_URI) {
  console.warn('MONGODB_URI is not set. MongoDB features will be disabled.');
}

declare global {
  // eslint-disable-next-line no-var -- global augmentation
  var _mongooseCache: { conn: Mongoose | null; promise: Promise<Mongoose> | null } | undefined;
}

const cached = globalThis._mongooseCache ?? { conn: null, promise: null };
if (process.env.NODE_ENV !== 'production') globalThis._mongooseCache = cached;

// Connection options with better timeout handling
const connectionOptions = {
  serverSelectionTimeoutMS: 10000, // 10 second timeout
  socketTimeoutMS: 45000, // 45 second timeout
  maxPoolSize: 10, // Maintain up to 10 socket connections
  heartbeatFrequencyMS: 10000, // Ping every 10 seconds
};

export async function connectDB(maxRetries = 3): Promise<Mongoose> {
  if (!MONGODB_URI) {
    console.warn('MONGODB_URI is not set. MongoDB features will be disabled.');
    throw new Error('MONGODB_URI is required to connect.');
  }
  
  console.log('Attempting to connect to MongoDB...');
  
  if (cached.conn) {
    console.log('Using cached MongoDB connection');
    return cached.conn;
  }
  
  if (!cached.promise) {
    console.log('Creating new MongoDB connection promise');
    
    const connectWithRetry = async (retriesLeft: number): Promise<Mongoose> => {
      try {
        const conn = await mongoose.connect(MONGODB_URI, connectionOptions);
        console.log('MongoDB connected successfully!');
        return conn;
      } catch (error) {
        console.error(`MongoDB connection attempt failed (${maxRetries - retriesLeft + 1}/${maxRetries}):`, error.message);
        
        if (retriesLeft <= 1) {
          throw error;
        }
        
        console.log(`Retrying in 2 seconds... (${retriesLeft - 1} attempts left)`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        return connectWithRetry(retriesLeft - 1);
      }
    };
    
    cached.promise = connectWithRetry(maxRetries);
  }
  
  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error('Failed to establish MongoDB connection after all retries:', error);
    cached.promise = null; // Reset promise on failure
    throw error;
  }
}

export default connectDB;
