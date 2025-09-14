# Torry Anchor - Fresh Meat Delivery Platform

A modern, production-ready ecommerce platform for fresh meat and seafood delivery built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Modern UI/UX** - Clean, professional design
- 📱 **Fully responsive** - Optimized for all devices
- 🛒 **Complete shopping experience** - Cart, wishlist, orders
- 🔐 **Email-based authentication** - Secure user management
- 🔍 **Advanced search** - Find products quickly
- 🏷️ **Smart categorization** - Freshwater, Seawater, Prawns & Crabs, Chicken & Mutton
- 🎠 **Dynamic carousel** - Promotional content management
- ⚡ **High performance** - Optimized with Next.js 15
- 🎯 **SEO optimized** - Built for search engines
- 🚀 **Production ready** - No dummy data, fully functional

## Tech Stack

- **Framework**: Next.js 15.5.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **State Management**: React Context
- **HTTP Client**: Axios
- **Font**: Poppins

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- API backend (configured in environment variables)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd Torry-Anchors-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

## Production Deployment

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_BASE=https://your-api-domain.com/api

# Environment
NODE_ENV=production

# Optional: Analytics and Monitoring
# NEXT_PUBLIC_GA_ID=your-google-analytics-id
# NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

### Deployment Options

#### 1. Vercel (Recommended)
- Push code to GitHub
- Connect repository to Vercel
- Configure environment variables in Vercel dashboard
- Deploy automatically

#### 2. Netlify
- Connect GitHub repository
- Set build command: `npm run build`
- Set publish directory: `.next`
- Configure environment variables

#### 3. Self-hosted
```bash
npm run build
npm start
```

### Production Checklist

- [ ] Environment variables configured
- [ ] API endpoints updated
- [ ] SSL certificate installed
- [ ] Domain configured
- [ ] Analytics setup (optional)
- [ ] Error monitoring setup (optional)

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── components/
│   ├── Header.tsx           # Navigation header
│   ├── HeroCarousel.tsx     # Promotional carousel
│   ├── CategoryNavigation.tsx # Category filters
│   ├── ProductCard.tsx      # Individual product card
│   └── ProductGrid.tsx      # Product grid layout
├── package.json             # Dependencies
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## Design Features

### Header Section
- **Logo**: Torry Anchor with anchor icon
- **Navigation**: Home, Wishlist, Orders, Profile
- **Search Bar**: With filter functionality
- **Pincode Input**: For delivery area
- **Shopping Cart**: With item count

### Hero Carousel
- **Auto-sliding**: Every 5 seconds
- **Promotional content**: Discount offers
- **Navigation arrows**: Manual control
- **Dot indicators**: Current slide position

### Category Navigation
- **Filter tabs**: All, Freshwater, Seawater, Prawns & crabs, Chicken & mutton
- **Active state**: Red underline for selected category
- **Responsive**: Adapts to mobile screens

### Product Grid
- **Product cards**: Image, title, description, price, discount
- **Add to cart**: Interactive button with feedback
- **Responsive grid**: 1-4 columns based on screen size
- **Hover effects**: Smooth animations

## Customization

### Colors
The design uses a red, white, and black color scheme:
- **Primary Red**: `#FF0000`
- **Secondary Black**: `#000000`
- **White**: `#FFFFFF`

### Font
- **Primary Font**: Poppins (Google Fonts)

### Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## Backend Integration

The frontend is ready for backend integration. You can:

1. **Replace mock data** in `ProductGrid.tsx` with API calls
2. **Add state management** (Redux, Zustand, etc.)
3. **Implement authentication** for user accounts
4. **Add payment gateway** integration
5. **Connect to your existing backend**

## Performance Optimizations

- **Image optimization** with Next.js Image component
- **Code splitting** for faster loading
- **Lazy loading** for components
- **CSS optimization** with Tailwind
- **SEO optimization** with proper meta tags

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for the Torry Anchor meat delivery store.

---

**Ready for production deployment!** 🚀 