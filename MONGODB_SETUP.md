# MongoDB Setup Guide for TorryAnchor Backend

## Prerequisites
- MongoDB Server installed and running
- MongoDB Compass (GUI tool) installed

## Installation Steps

### 1. Install MongoDB Server (if not already installed)
```bash
# Using Chocolatey (run as Administrator)
choco install mongodb

# Or download from: https://www.mongodb.com/try/download/community
```

### 2. Install MongoDB Compass
- Download from: https://www.mongodb.com/try/download/compass
- Install the downloaded .exe file
- Launch MongoDB Compass

### 3. Start MongoDB Service
```bash
# Start MongoDB service
net start MongoDB

# Or if using MongoDB Community Server
"C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" --config "C:\Program Files\MongoDB\Server\6.0\bin\mongod.cfg"
```

## Connection Configuration

### Local MongoDB Connection
- **Connection String**: `mongodb://localhost:27017/torry_anchor`
- **Host**: localhost
- **Port**: 27017
- **Database**: torry_anchor

### MongoDB Compass Connection Steps
1. Open MongoDB Compass
2. Click "New Connection"
3. Enter connection string: `mongodb://localhost:27017`
4. Click "Connect"
5. Create database: `torry_anchor`
6. Create collections as needed:
   - `users`
   - `products`
   - `carts`
   - `orders`

### Environment Variables
Create a `.env` file in the project root:
```env
MONGO_URI=mongodb://localhost:27017/torry_anchor
PORT=5001
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key
```

## Testing the Connection

### 1. Start the Backend Server
```bash
cd TorryAnchorBackend
npm install
npm start
```

### 2. Verify Connection
- Check console for "MongoDB connected successfully" message
- Use MongoDB Compass to browse the database
- Verify collections are created automatically

## Troubleshooting

### Common Issues
1. **MongoDB not running**
   - Check if MongoDB service is running
   - Verify MongoDB is installed correctly

2. **Connection refused**
   - Ensure MongoDB is listening on port 27017
   - Check firewall settings

3. **Authentication failed**
   - Local MongoDB typically doesn't require authentication
   - If using MongoDB Atlas, check username/password

### Useful Commands
```bash
# Check if MongoDB is running
netstat -an | findstr 27017

# Check MongoDB service status
sc query MongoDB

# Start MongoDB service
net start MongoDB

# Stop MongoDB service
net stop MongoDB
```

## Database Schema
The application will automatically create the following collections:
- **users**: User accounts and authentication
- **products**: Product catalog
- **carts**: Shopping cart items
- **orders**: Order history and details

## Security Notes
- Change default JWT_SECRET in production
- Use environment variables for sensitive data
- Consider enabling MongoDB authentication for production
- Regular backups recommended

