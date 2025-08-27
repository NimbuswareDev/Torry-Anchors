const connectMongo = require('./config/mongo');

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    await connectMongo();
    console.log('✅ MongoDB connection successful!');
    
    // Test database operations
    const mongoose = require('mongoose');
    const db = mongoose.connection;
    
    console.log(`📊 Database: ${db.name}`);
    console.log(`🔌 Host: ${db.host}`);
    console.log(`🚪 Port: ${db.port}`);
    
    // List all collections
    const collections = await db.db.listCollections().toArray();
    console.log('📚 Collections:', collections.map(c => c.name));
    
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();

