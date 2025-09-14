const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('Testing Gmail configuration...');
console.log('GMAIL_USER:', process.env.GMAIL_USER);
console.log('GMAIL_APP_PASSWORD length:', process.env.GMAIL_APP_PASSWORD?.length);

// Test different Gmail configurations
const configs = [
  {
    name: 'Config 1: Service Gmail',
    config: {
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    }
  },
  {
    name: 'Config 2: SMTP Gmail',
    config: {
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    }
  },
  {
    name: 'Config 3: SMTP Gmail with TLS',
    config: {
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
    }
  }
];

async function testConfig(config) {
  try {
    console.log(`\nTesting ${config.name}...`);
    const transporter = nodemailer.createTransport(config.config);
    await transporter.verify();
    console.log(`✅ ${config.name} - SUCCESS`);
    return true;
  } catch (error) {
    console.log(`❌ ${config.name} - FAILED: ${error.message}`);
    return false;
  }
}

async function testAllConfigs() {
  for (const config of configs) {
    await testConfig(config);
  }
}

testAllConfigs().then(() => {
  console.log('\nGmail configuration test completed.');
  process.exit(0);
}).catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
