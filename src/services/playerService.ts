
import api from './api';

export interface Player {
  id: string;
  name: string;
  position: string;
  jerseyNumber: number;
  age: number;
  height: string;
  weight: string;
  nationality: string;
  bio: string;
  imageUrl: string;
}

export const getPlayers = async (): Promise<Player[]> => {
  const response = await api.get<Player[]>('/players');
  return response.data;
};

export const getPlayer = async (id: string): Promise<Player> => {
  const response = await api.get<Player>(`/players/${id}`);
  return response.data;
};

export const createPlayer = async (player: Omit<Player, 'id'>): Promise<Player> => {
  const response = await api.post<Player>('/players', player);
  return response.data;
};

export const updatePlayer = async (id: string, player: Partial<Player>): Promise<Player> => {
  const response = await api.put<Player>(`/players/${id}`, player);
  return response.data;
};

export const deletePlayer = async (id: string): Promise<void> => {
  await api.delete(`/players/${id}`);
};
