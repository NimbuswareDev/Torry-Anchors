require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('Environment variables:');
console.log('GMAIL_USER:', process.env.GMAIL_USER);
console.log('GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? 'SET' : 'NOT SET');

async function sendTestEmail() {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    console.log('\nSending test email...');
    
    const result = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: 'test@example.com',
      subject: 'Test Email from TorryAnchor',
      text: 'This is a test email to verify Gmail configuration.'
    });

    console.log('✅ Email sent successfully!');
    console.log('Message ID:', result.messageId);
    
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    console.error('Full error:', error);
  }
}

sendTestEmail();
