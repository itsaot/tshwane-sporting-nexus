
import api from './api';

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
  event: string;
  date: string;
}

export const getGalleryItems = async (): Promise<GalleryItem[]> => {
  const response = await api.get<GalleryItem[]>('/gallery');
  return response.data;
};

export const getGalleryItem = async (id: string): Promise<GalleryItem> => {
  const response = await api.get<GalleryItem>(`/gallery/${id}`);
  return response.data;
};

export const createGalleryItem = async (item: Omit<GalleryItem, 'id'>): Promise<GalleryItem> => {
  const response = await api.post<GalleryItem>('/gallery', item);
  return response.data;
};

export const updateGalleryItem = async (id: string, item: Partial<GalleryItem>): Promise<GalleryItem> => {
  const response = await api.put<GalleryItem>(`/gallery/${id}`, item);
  return response.data;
};

export const deleteGalleryItem = async (id: string): Promise<void> => {
  await api.delete(`/gallery/${id}`);
};
