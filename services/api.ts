import axios from 'axios';

// API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE || 'https://torry-anchors.onrender.com/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  // Register new user
  register: async (email: string, password: string) => {
    const response = await api.post('/auth/register', { email, password });
    return response.data;
  },

  // Verify registration OTP
  verifyRegister: async (email: string, otp: string, password: string) => {
    const response = await api.post('/auth/verify-register', { email, otp, password });
    return response.data;
  },

  // Login
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  // Verify login OTP
  verifyLogin: async (email: string, otp: string) => {
    const response = await api.post('/auth/verify-login', { email, otp });
    return response.data;
  },

  // Get user profile
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

// Products API functions
export const productsAPI = {
  // Get all products
  getAll: async () => {
    const response = await api.get('/products');
    return response.data;
  },

  // Add new product (retailer only)
  add: async (productData: any) => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  // Update product (retailer only)
  update: async (id: number, productData: any) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  // Delete product (retailer only)
  delete: async (id: number) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
};

// Cart API functions
export const cartAPI = {
  // Get user's cart
  getCart: async () => {
    const response = await api.get('/cart');
    return response.data;
  },

  // Add item to cart
  addToCart: async (productId: string | number, quantity: number) => {
    const response = await api.post('/cart/add', { productId, quantity });
    return response.data;
  },

  // Remove item from cart
  removeFromCart: async (productId: string | number) => {
    const response = await api.post('/cart/remove', { productId });
    return response.data;
  },

  // Update cart item quantity
  updateQuantity: async (productId: string | number, quantity: number) => {
    const response = await api.patch('/cart/update', { productId, quantity });
    return response.data;
  },

  // Buy cart items
  buyCart: async (shippingAddress: string, paymentMethod: string) => {
    const response = await api.post('/cart/buy', { shippingAddress, paymentMethod });
    return response.data;
  },
};

// Payment API functions
export const paymentAPI = {
  // Create payment order
  createOrder: async (amount: number, currency: string = 'INR', receipt?: string) => {
    const response = await api.post('/payment/create-order', { amount, currency, receipt });
    return response.data;
  },

  // Verify payment
  verifyPayment: async (paymentId: string, orderId: string, signature: string) => {
    const response = await api.post('/payment/verify', {
      razorpay_payment_id: paymentId,
      razorpay_order_id: orderId,
      razorpay_signature: signature,
    });
    return response.data;
  },
};

export default api; 