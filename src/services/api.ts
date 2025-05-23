
import axios from 'axios';

// Create an axios instance
const api = axios.create({
  baseURL: import.meta.env.PROD ? '/api' : 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

// Add a request interceptor to include the auth token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('API Request:', config.method?.toUpperCase(), config.url, config.data);
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data || error.message);
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Player API functions
export const createPlayer = async (playerData: any) => {
  try {
    const response = await api.post('/players', playerData);
    return response.data;
  } catch (error) {
    console.error('Failed to create player:', error);
    throw error;
  }
};

// Coach API functions
export const createCoach = async (coachData: any) => {
  try {
    const response = await api.post('/coaches', coachData);
    return response.data;
  } catch (error) {
    console.error('Failed to create coach:', error);
    throw error;
  }
};

// Gallery API functions
export const fetchGallery = async () => {
  try {
    const response = await api.get('/gallery');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch gallery items:', error);
    // Return empty array in case of error
    return [];
  }
};

export default api;
