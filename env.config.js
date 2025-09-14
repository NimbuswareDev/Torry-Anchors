// TorryAnchors Frontend Environment Configuration
// Copy these variables to your .env file

module.exports = {
  // API Configuration
  NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE || 'https://torry-anchors.onrender.com/api',
  
  // Next.js Configuration
  NODE_ENV: process.env.NODE_ENV || 'production',
  NEXT_PUBLIC_APP_NAME: 'TorryAnchors',
  NEXT_PUBLIC_APP_VERSION: '1.0.0',
  
  // Development Server
  PORT: process.env.PORT || 3000,
  
  // External Services (configure as needed)
  // NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '',
  // NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
  // NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
  
  // Feature Flags
  NEXT_PUBLIC_ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  NEXT_PUBLIC_ENABLE_DEBUG_MODE: process.env.NODE_ENV === 'development',
  
  // Security
  NEXT_PUBLIC_SESSION_TIMEOUT: 3600000, // 1 hour
  
  // Image Domains (for Next.js Image optimization)
  NEXT_PUBLIC_IMAGE_DOMAINS: 'images.unsplash.com,via.placeholder.com,api.dicebear.com'
};

// Instructions:
// 1. Create a .env file in your project root
// 2. Copy the variables above to your .env file
// 3. Replace the values with your actual configuration
// 4. Make sure .env is in your .gitignore (it already is)
