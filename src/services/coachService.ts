
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
  const response = await api.get<Coach[]>('/coaches');
  return response.data;
};

export const getCoach = async (id: string): Promise<Coach> => {
  const response = await api.get<Coach>(`/coaches/${id}`);
  return response.data;
};

export const createCoach = async (coach: Omit<Coach, 'id'>): Promise<Coach> => {
  const response = await api.post<Coach>('/coaches', coach);
  return response.data;
};

export const updateCoach = async (id: string, coach: Partial<Coach>): Promise<Coach> => {
  const response = await api.put<Coach>(`/coaches/${id}`, coach);
  return response.data;
};

export const deleteCoach = async (id: string): Promise<void> => {
  await api.delete(`/coaches/${id}`);
};
