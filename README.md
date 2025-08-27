# TorryAnchor Backend

A Node.js + Express backend with PostgreSQL for a seafood e-commerce platform, featuring phone-based authentication with OTP, role-based access control (consumer/retailer), product management, shopping cart, and Razorpay payment integration.

## Features

- 🔐 **Secure Authentication**
  - Phone number + password registration
  - OTP-based two-factor authentication
  - JWT-based session management

- 🛍️ **Product Management**
  - CRUD operations for products (retailer only)
  - Bulk import/export
  - Inventory management

- 🛒 **Shopping Cart**
  - Add/remove items
  - Quantity updates
  - Checkout process

- 💳 **Payments**
  - Razorpay integration
  - Secure payment verification
  - Order management

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT + OTP
- **Payments**: Razorpay
- **Logging**: Winston
- **Validation**: Express Validator
- **Environment**: Dotenv

## Getting Started

### Prerequisites

- Node.js (v14+)
- PostgreSQL (v12+)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/torryanchor-backend.git
   cd torryanchor-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   # Server
   PORT=5001
   NODE_ENV=development
   
   # Database
   DB_NAME=torry_anchor
   DB_USER=postgres
   DB_PASS=your_db_password
   DB_HOST=localhost
   DB_PORT=5432
   
   # JWT
   JWT_SECRET=your_jwt_secret_key
   
   # OTP (Twilio for production, mock for development)
   TWILIO_ACCOUNT_SID=your_twilio_sid
   TWILIO_AUTH_TOKEN=your_twilio_token
   TWILIO_PHONE_NUMBER=your_twilio_phone
   
   # Razorpay
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

4. **Set up the database**
   ```bash
   # Create database
   createdb torry_anchor
   
   # Run migrations
   npx sequelize-cli db:migrate
   
   # (Optional) Seed initial data
   npx sequelize-cli db:seed:all
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```
   The server will be available at `http://localhost:5001`

## API Documentation

For detailed API documentation, please refer to [API_DOCS.md](API_DOCS.md).

## Project Structure

```
├── config/               # Configuration files
├── controllers/          # Route controllers
├── middlewares/          # Custom middlewares
├── migrations/           # Database migrations
├── models/               # Database models
├── routes/               # API routes
├── services/             # Business logic
├── utils/                # Utility functions
├── validators/           # Request validators
├── .env                  # Environment variables
├── .gitignore
├── app.js                # Express application
├── package.json
└── README.md
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5001 |
| NODE_ENV | Environment (development/production) | development |
| DB_NAME | Database name | - |
| DB_USER | Database user | - |
| DB_PASS | Database password | - |
| DB_HOST | Database host | localhost |
| DB_PORT | Database port | 5432 |
| JWT_SECRET | Secret for JWT signing | - |
| TWILIO_* | Twilio credentials | - |
| RAZORPAY_* | Razorpay credentials | - |

## Development

### Scripts

- `npm run dev`: Start development server with hot-reload
- `npm test`: Run tests
- `npm run lint`: Run ESLint
- `npm run migrate`: Run database migrations
- `npm run seed`: Seed the database with test data

### Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Deployment

For production deployment, make sure to:

1. Set `NODE_ENV=production`
2. Configure proper database connection
3. Set up HTTPS
4. Configure proper CORS settings
5. Set up monitoring and logging

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com

Project Link: [https://github.com/yourusername/torryanchor-backend](https://github.com/yourusername/torryanchor-backend)