
import api from './api';

export interface Coach {
  id: string;
  name: string;
  position: string;
  experience: number;
  nationality: string;
  bio: string;
  imageUrl: string;
  qualifications: string[];
}

export const getCoaches = async (): Promise<Coach[]> => {
  try {
    const response = await api.get('/coaches');
    console.log('API Response for coaches:', response.data);
    
    // Ensure we always return an array
    const coaches = Array.isArray(response.data) ? response.data : [];
    return coaches;
  } catch (error) {
    console.error('Failed to fetch coaches from API:', error);
    // Return empty array on error to prevent map errors
    return [];
  }
};

export const getCoach = async (id: string): Promise<Coach> => {
  try {
    const response = await api.get(`/coaches/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch coach ${id}:`, error);
    throw error;
  }
};

export const createCoach = async (coach: Omit<Coach, 'id'>): Promise<Coach> => {
  try {
    const response = await api.post('/coaches', coach);
    return response.data;
  } catch (error) {
    console.error('Failed to create coach:', error);
    throw error;
  }
};

export const updateCoach = async (id: string, coach: Partial<Coach>): Promise<Coach> => {
  try {
    const response = await api.put(`/coaches/${id}`, coach);
    return response.data;
  } catch (error) {
    console.error(`Failed to update coach ${id}:`, error);
    throw error;
  }
};

export const deleteCoach = async (id: string): Promise<void> => {
  try {
    await api.delete(`/coaches/${id}`);
  } catch (error) {
    console.error(`Failed to delete coach ${id}:`, error);
    throw error;
  }
};
