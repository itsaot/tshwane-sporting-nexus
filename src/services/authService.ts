
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

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    // If API fails in development, try mock users
    if (import.meta.env.DEV && axios.isAxiosError(error) && error.code === 'ECONNREFUSED') {
      return handleMockLogin(credentials);
    }
    throw error;
  }
};

// Mock login for development when backend is not available
const handleMockLogin = async (credentials: LoginCredentials): Promise<AuthResponse> => {
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

  const mockUser = MOCK_USERS[credentials.email as keyof typeof MOCK_USERS];
  
  if (mockUser && mockUser.password === credentials.password) {
    const mockResponse: AuthResponse = {
      token: `mock-token-${mockUser.id}-${Date.now()}`,
      user: {
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        role: mockUser.role
      }
    };
    
    localStorage.setItem('token', mockResponse.token);
    localStorage.setItem('user', JSON.stringify(mockResponse.user));
    
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockResponse;
  }
  
  throw new Error('Invalid credentials');
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
