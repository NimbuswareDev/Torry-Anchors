const mongoose = require('mongoose');
const mongoConfig = require('./mongodb.config');

async function connectMongo(uri, environment = 'development') {
  const config = mongoConfig[environment] || mongoConfig.development;
  
  if (!uri && !config.uri) {
    throw new Error('MONGO_URI not set and no default configuration found');
  }
  
  const connectionUri = uri || config.uri;
  const options = config.options;
  
  try {
    await mongoose.connect(connectionUri, options);
    console.log(`MongoDB connected successfully to: ${connectionUri}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('MongoDB reconnected');
    });
    
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    throw error;
  }
}

module.exports = connectMongo;

