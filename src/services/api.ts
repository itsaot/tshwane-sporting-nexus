
import axios from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Update this with your actual API URL
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include the auth token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
