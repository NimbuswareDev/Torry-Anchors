# TorryAnchor - E-commerce API

TorryAnchor is a Node.js-based e-commerce API with user authentication, product management, shopping cart functionality, and mock payment processing.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher) or yarn
- PostgreSQL (v12 or higher)
- Git

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd TorryAnchor
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Database Setup

1. Make sure PostgreSQL is running on your machine.
2. Create a new database:
   ```bash
   createdb torry_anchor
   ```
3. Create a database user (optional, you can use your default PostgreSQL user):
   ```bash
   createuser -s torry_user
   psql -c "ALTER USER torry_user WITH PASSWORD 'yourpassword';"
   ```

### 4. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DB_NAME=torry_anchor
DB_USER=your_db_user
DB_PASS=your_db_password
DB_HOST=localhost
DB_PORT=5432

# JWT Configuration
JWT_SECRET=your_jwt_secret_key

# Server Configuration
PORT=5001
NODE_ENV=development

# Mock Services (no real credentials needed for development)
TWILIO_ACCOUNT_SID=mock_account_sid
TWILIO_AUTH_TOKEN=mock_auth_token
TWILIO_PHONE_NUMBER=+15005550006

# Mock Payment Configuration
RAZORPAY_KEY_ID=mock_key_id
RAZORPAY_KEY_SECRET=mock_key_secret
```

### 5. Run Migrations

```bash
npx sequelize-cli db:migrate
```

### 6. Start the Development Server

```bash
npm run dev
# or
yarn dev
```

The server will start on `http://localhost:5001` by default.

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user (consumer)
- `POST /api/auth/login` - Login with phone/password
- `POST /api/auth/verify-register` - Verify OTP for registration
- `POST /api/auth/register-retailer` - Register a new retailer (superuser only)

### Products

- `GET /api/products` - Get all products (authenticated)
- `POST /api/products` - Add a new product (retailer only)
- `PUT /api/products/:id` - Update a product (retailer only)
- `DELETE /api/products/:id` - Delete a product (retailer only)

### Cart

- `GET /api/cart` - Get user's cart (consumer only)
- `POST /api/cart/add` - Add item to cart (consumer only)
- `POST /api/cart/remove` - Remove item from cart (consumer only)
- `POST /api/cart/buy` - Purchase items in cart (consumer only)

### Payments

- `POST /api/payment/create-order` - Create a payment order
- `POST /api/payment/verify` - Verify a payment

## Mock Services

This project uses mock services for:

1. **OTP Verification**: Instead of sending real SMS, OTPs are logged to the console.
2. **Payments**: Payment processing is simulated without actual payment gateways.

## Testing the API

You can use tools like Postman, cURL, or any API client to test the endpoints. Here's a quick test using cURL:

### Register a New User

```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"phone": "+1234567890", "password": "password123"}'
```

### Login

```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"phone": "+1234567890", "password": "password123"}'
```

## Database Schema

### Users
- id (PK)
- phone (string, unique)
- password (hashed)
- role (enum: 'consumer', 'retailer', 'superuser')
- twofaCode (string, nullable)
- twofaExpires (datetime, nullable)
- createdAt (datetime)
- updatedAt (datetime)

### Products
- id (PK)
- name (string)
- description (text, nullable)
- price (decimal)
- quantity (integer)
- imageUrl (string, nullable)
- userId (FK to Users)
- createdAt (datetime)
- updatedAt (datetime)

### Carts
- id (PK)
- userId (FK to Users)
- productId (FK to Products)
- quantity (integer)
- createdAt (datetime)
- updatedAt (datetime)

### Orders
- id (PK)
- userId (FK to Users)
- amount (decimal)
- currency (string)
- status (string)
- receipt (string)
- createdAt (datetime)
- updatedAt (datetime)

### Transactions
- id (PK)
- userId (FK to Users)
- orderId (FK to Orders)
- paymentId (string)
- amount (decimal)
- status (string)
- gateway (string)
- createdAt (datetime)
- updatedAt (datetime)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
