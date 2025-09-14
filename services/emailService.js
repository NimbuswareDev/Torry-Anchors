const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = null;
  }

  initializeTransporter() {
    if (!this.transporter) {
      // Gmail SMTP configuration for production
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD
        }
      });
    }
  }

  async sendOTPEmail(email, otp, type = 'registration') {
    try {
      this.initializeTransporter();
      
      const subject = type === 'registration' 
        ? 'TorryAnchor - Verify Your Registration' 
        : 'TorryAnchor - Login Verification Code';

      const textContent = `
TorryAnchor ${type === 'registration' ? 'Registration' : 'Login'} Verification

Your verification code is: ${otp}

This code will expire in 5 minutes.
Do not share this code with anyone.

If you didn't request this, please ignore this email.

© 2024 TorryAnchor. All rights reserved.
      `;

      const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: subject,
        text: textContent
      };

      const result = await this.transporter.sendMail(mailOptions);
      console.log(`📧 OTP sent to ${email}: ${otp}`);
      
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Email sending failed:', error);
      return { success: false, error: error.message };
    }
  }

  async verifyEmailConfiguration() {
    try {
      this.initializeTransporter();
      await this.transporter.verify();
      console.log('✅ Gmail email service is ready');
      return true;
    } catch (error) {
      console.error('❌ Gmail configuration error:', error.message);
      return false;
    }
  }
}

module.exports = new EmailService();
