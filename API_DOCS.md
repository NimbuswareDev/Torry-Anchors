# TorryAnchor API Documentation

## Base URL
```
http://localhost:5001/api
```

## Authentication
All endpoints (except `/auth/register` and `/auth/login`) require a valid JWT token in the `Authorization` header:
```
Authorization: Bearer <token>
```

## Table of Contents
1. [Authentication](#authentication-endpoints)
2. [Products](#products-endpoints)
3. [Cart](#cart-endpoints)
4. [Payments](#payment-endpoints)

---

## Authentication Endpoints

### Register a New User
- **URL**: `/auth/register`
- **Method**: `POST`
- **Description**: Register a new consumer user with phone number and password
- **Request Body**:
  ```json
  {
    "phone": "+1234567890",
    "password": "securepassword123"
  }
  ```
- **Success Response**:
  - **Code**: 201
  - **Content**:
    ```json
    {
      "message": "OTP sent to your phone. Please verify OTP to complete registration."
    }
    ```

### Verify Registration OTP
- **URL**: `/auth/verify-register`
- **Method**: `POST`
- **Description**: Verify the OTP sent to the user's phone
- **Request Body**:
  ```json
  {
    "phone": "+1234567890",
    "otp": "123456"
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "message": "Registration verified. You can now login."
    }
    ```

### Login
- **URL**: `/auth/login`
- **Method**: `POST`
- **Description**: Authenticate a user and get a JWT token
- **Request Body**:
  ```json
  {
    "phone": "+1234567890",
    "password": "securepassword123"
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "message": "OTP sent. Please provide the OTP to complete login.",
      "requiresOTP": true
    }
    ```
  - **After OTP Verification**:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": 1,
        "phone": "+1234567890",
        "role": "consumer"
      }
    }
    ```

---

## Products Endpoints

### Get All Products
- **URL**: `/products`
- **Method**: `GET`
- **Description**: Get a list of all products (available to all authenticated users)
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    [
      {
        "id": 1,
        "name": "Wild Salmon",
        "description": "Fresh wild-caught salmon",
        "price": 24.99,
        "quantity": 50,
        "area": "Alaska",
        "retailerId": 2,
        "createdAt": "2025-08-01T12:00:00.000Z",
        "updatedAt": "2025-08-01T12:00:00.000Z"
      }
    ]
    ```

### Add a New Product (Retailer Only)
- **URL**: `/products`
- **Method**: `POST`
- **Description**: Add a new product to the inventory
- **Request Body**:
  ```json
  {
    "name": "Tuna Steak",
    "description": "Fresh tuna steaks",
    "price": 19.99,
    "quantity": 30,
    "area": "Pacific Ocean",
    "category": "seafood"
  }
  ```
- **Success Response**:
  - **Code**: 201
  - **Content**:
    ```json
    {
      "id": 2,
      "name": "Tuna Steak",
      "price": 19.99,
      "quantity": 30,
      "area": "Pacific Ocean"
    }
    ```

### Update a Product (Retailer Only)
- **URL**: `/products/:id`
- **Method**: `PUT`
- **Description**: Update an existing product
- **URL Parameters**:
  - `id`: Product ID
- **Request Body**:
  ```json
  {
    "name": "Tuna Steak",
    "price": 22.99,
    "quantity": 25,
    "area": "Pacific Ocean"
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "message": "Product updated successfully",
      "product": {
        "id": 2,
        "name": "Tuna Steak",
        "price": 22.99,
        "quantity": 25
      }
    }
    ```

### Bulk Add Products (Retailer Only)
- **URL**: `/products/bulk`
- **Method**: `POST`
- **Description**: Add multiple products at once
- **Request Body**:
  ```json
  {
    "products": [
      {
        "name": "Squid",
        "description": "Fresh squid",
        "price": 15.99,
        "quantity": 40,
        "area": "Mediterranean",
        "category": "seafood"
      },
      {
        "name": "Octopus",
        "description": "Fresh octopus",
        "price": 29.99,
        "quantity": 20,
        "area": "Mediterranean",
        "category": "seafood"
      }
    ]
  }
  ```
- **Success Response**:
  - **Code**: 201
  - **Content**:
    ```json
    {
      "message": "Products added successfully",
      "count": 2,
      "products": [
        {
          "id": 3,
          "name": "Squid",
          "price": 15.99,
          "quantity": 40,
          "area": "Mediterranean"
        },
        {
          "id": 4,
          "name": "Octopus",
          "price": 29.99,
          "quantity": 20,
          "area": "Mediterranean"
        }
      ]
    }
    ```

### Update Product Quantity (Retailer Only)
- **URL**: `/products/:id/quantity`
- **Method**: `PATCH`
- **Description**: Update the quantity of a product (add or subtract)
- **URL Parameters**:
  - `id`: Product ID
- **Request Body**:
  ```json
  {
    "change": 5
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "message": "Quantity updated successfully",
      "product": {
        "id": 2,
        "name": "Tuna Steak",
        "quantity": 30
      }
    }
    ```

### Delete a Product (Retailer Only)
- **URL**: `/products/:id`
- **Method**: `DELETE`
- **Description**: Delete a product
- **URL Parameters**:
  - `id`: Product ID
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "message": "Product deleted successfully"
    }
    ```

### Bulk Delete Products (Retailer Only)
- **URL**: `/products/bulk`
- **Method**: `DELETE`
- **Description**: Delete multiple products at once
- **Request Body**:
  ```json
  {
    "productIds": [3, 4]
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "message": "Products deleted successfully",
      "count": 2
    }
    ```

---

## Cart Endpoints

### Get Cart
- **URL**: `/cart`
- **Method**: `GET`
- **Description**: Get the current user's cart
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "items": [
        {
          "productId": 1,
          "name": "Wild Salmon",
          "quantity": 2,
          "price": 24.99,
          "subtotal": 49.98
        }
      ],
      "total": 49.98
    }
    ```

### Add to Cart
- **URL**: `/cart/add`
- **Method**: `POST`
- **Description**: Add a product to the cart
- **Request Body**:
  ```json
  {
    "productId": 1,
    "quantity": 2
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "message": "Item added to cart",
      "cartItem": {
        "productId": 1,
        "quantity": 2
      }
    }
    ```

### Remove from Cart
- **URL**: `/cart/remove`
- **Method**: `POST`
- **Description**: Remove a product from the cart
- **Request Body**:
  ```json
  {
    "productId": 1
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "message": "Item removed from cart"
    }
    ```

### Buy Cart Items
- **URL**: `/cart/buy`
- **Method**: `POST`
- **Description**: Purchase all items in the cart
- **Request Body**:
  ```json
  {
    "shippingAddress": "123 Main St, Anytown, USA",
    "paymentMethod": "razorpay"
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "message": "Order placed successfully",
      "orderId": "order_12345"
    }
    ```

---

## Payment Endpoints

### Create Payment Order
- **URL**: `/payment/create-order`
- **Method**: `POST`
- **Description**: Create a new payment order with Razorpay
- **Request Body**:
  ```json
  {
    "amount": 4999,
    "currency": "INR",
    "receipt": "order_12345"
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "id": "order_12345",
      "entity": "order",
      "amount": 4999,
      "amount_paid": 0,
      "amount_due": 4999,
      "currency": "INR",
      "receipt": "order_12345",
      "status": "created",
      "attempts": 0
    }
    ```

### Verify Payment
- **URL**: `/payment/verify`
- **Method**: `POST`
- **Description**: Verify a Razorpay payment
- **Request Body**:
  ```json
  {
    "order_id": "order_12345",
    "payment_id": "pay_12345",
    "signature": "signature_12345"
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "message": "Payment verified successfully",
      "orderId": "order_12345"
    }
    ```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Validation error",
  "errors": ["Phone is required", "Password must be at least 6 characters"]
}
```

### 401 Unauthorized
```json
{
  "message": "No token provided"
}
```

### 403 Forbidden
```json
{
  "message": "Forbidden"
}
```

### 404 Not Found
```json
{
  "message": "Product not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error",
  "error": "Error message details"
}
```

## Rate Limiting
- 100 requests per 15 minutes per IP address
