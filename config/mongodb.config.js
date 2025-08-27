// MongoDB Configuration
const mongoConfig = {
  development: {
    uri: 'mongodb://localhost:27017/torry_anchor',
    options: {
      autoIndex: true,
    }
  },
  test: {
    uri: 'mongodb://localhost:27017/torry_anchor_test',
    options: {
      autoIndex: true,
    }
  },
  production: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/torry_anchor',
    options: {
      autoIndex: true,
    }
  }
};

module.exports = mongoConfig;

