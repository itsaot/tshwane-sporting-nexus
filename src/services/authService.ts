
import api from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
  }
}

// Mock admin credentials for development/testing
const MOCK_USERS = {
  'admin@tsfc.co.za': {
    id: 'admin-001',
    name: 'Admin User',
    email: 'admin@tsfc.co.za',
    password: 'admin123',
    role: 'admin' as const
  },
  'user@tsfc.co.za': {
    id: 'user-001',
    name: 'Regular User',
    email: 'user@tsfc.co.za',
    password: 'user123',
    role: 'user' as const
  }
};

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  // For development purposes, check against mock users first
  // In production, this would be replaced with the actual API call
  if (import.meta.env.DEV) {
    const mockUser = MOCK_USERS[credentials.email as keyof typeof MOCK_USERS];
    
    if (mockUser && mockUser.password === credentials.password) {
      // Create a mock token (in production this would come from the backend)
      const mockResponse: AuthResponse = {
        token: `mock-token-${mockUser.id}-${Date.now()}`,
        user: {
          id: mockUser.id,
          name: mockUser.name,
          email: mockUser.email,
          role: mockUser.role
        }
      };
      
      // Store auth data in localStorage
      localStorage.setItem('token', mockResponse.token);
      localStorage.setItem('user', JSON.stringify(mockResponse.user));
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return mockResponse;
    }
  }

  // If not in dev mode or mock user not found/password incorrect, call the API
  const response = await api.post<AuthResponse>('/auth/login', credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem('token') !== null;
};

export const getCurrentUser = (): { id: string; name: string; email: string; role: string } | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  return user ? user.role === 'admin' : false;
};
