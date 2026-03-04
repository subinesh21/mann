// Test MongoDB connection

// Load environment variables
require('dotenv').config({ path: __dirname + '/.env.local' });

console.log('MONGODB_URI from process.env:', process.env.MONGODB_URI ? 'SET' : 'NOT SET');
console.log('Full URI:', process.env.MONGODB_URI);

if (process.env.MONGODB_URI) {
  console.log('URI length:', process.env.MONGODB_URI.length);
  console.log('URI starts with:', process.env.MONGODB_URI.substring(0, 100));
}