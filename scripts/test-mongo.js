// Simple MongoDB connectivity test
require('dotenv').config({ path: __dirname + '/../.env.local' });

const { MongoClient } = require('mongodb');

async function testConnection() {
  const uri = process.env.MONGODB_URI;
  console.log('Testing connection to:', uri.substring(0, 50) + '...');
  
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000, // 5 second timeout
  });

  try {
    console.log('Connecting...');
    await client.connect();
    console.log('✅ Connected successfully!');
    
    // Test a simple operation
    const db = client.db('cgg-eha');
    const collections = await db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('Error code:', error.code);
    console.error('Error syscall:', error.syscall);
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

testConnection();