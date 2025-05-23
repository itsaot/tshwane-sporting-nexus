
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
// src/services/api.ts
const API_BASE_URL = "http://localhost:5000/api";

export async function fetchPlayers() {
  const res = await fetch(`${API_BASE_URL}/players`);
  return res.json();
}

export async function fetchCoaches() {
  const res = await fetch(`${API_BASE_URL}/coaches`);
  return res.json();
}

export async function fetchGallery() {
  const res = await fetch(`${API_BASE_URL}/gallery`);
  return res.json();
}

// Admin (example)
export async function createPlayer(playerData: unknown) {
  const res = await fetch(`${API_BASE_URL}/players`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(playerData),
  });
  return res.json();
}
export async function updatePlayer(playerId: string, playerData: unknown) {
  const res = await fetch(`${API_BASE_URL}/players/${playerId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(playerData),
  });
  return res.json();
}
export async function deletePlayer(playerId: string) {
  const res = await fetch(`${API_BASE_URL}/players/${playerId}`, {
    method: "DELETE",
  });
  return res.json();
}
export async function createCoach(coachData: unknown) {
  const res = await fetch(`${API_BASE_URL}/coaches`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(coachData),
  });
  return res.json();
}
export async function updateCoach(coachId: string, coachData: unknown) {
  const res = await fetch(`${API_BASE_URL}/coaches/${coachId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(coachData),
  });
  return res.json();
}
export async function deleteCoach(coachId: string) {
  const res = await fetch(`${API_BASE_URL}/coaches/${coachId}`, {
    method: "DELETE",
  });
  return res.json();
}
export async function createGalleryItem(galleryData: unknown) {
  const res = await fetch(`${API_BASE_URL}/gallery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(galleryData),
  });
  return res.json();
}
export async function updateGalleryItem(galleryId: string, galleryData: unknown) {
  const res = await fetch(`${API_BASE_URL}/gallery/${galleryId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(galleryData),
  });
  return res.json();
}
export async function deleteGalleryItem(galleryId: string) {
  const res = await fetch(`${API_BASE_URL}/gallery/${galleryId}`, {
    method: "DELETE",
  });
  return res.json();
}
export async function login(username: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}
export async function register(username: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}
export async function logout() {
  const res = await fetch(`${API_BASE_URL}/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}
export async function getUser() {
  const res = await fetch(`${API_BASE_URL}/user`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}
export async function updateUser(userId: string, userData: unknown) {
  const res = await fetch(`${API_BASE_URL}/user/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
}
export async function deleteUser(userId: string) {
  const res = await fetch(`${API_BASE_URL}/user/${userId}`, {
    method: "DELETE",
  });
  return res.json();
}
export async function fetchUserById(userId: string) {
  const res = await fetch(`${API_BASE_URL}/user/${userId}`);
  return res.json();
}
export async function fetchUserByUsername(username: string) {
  const res = await fetch(`${API_BASE_URL}/user/username/${username}`);
  return res.json();
}
export async function fetchUserByEmail(email: string) {
  const res = await fetch(`${API_BASE_URL}/user/email/${email}`);
  return res.json();
}
export async function fetchUserByPhone(phone: string) {
  const res = await fetch(`${API_BASE_URL}/user/phone/${phone}`);
  return res.json();
}
export async function fetchUserByRole(role: string) {
  const res = await fetch(`${API_BASE_URL}/user/role/${role}`);
  return res.json();
}
export async function fetchUserByStatus(status: string) {
  const res = await fetch(`${API_BASE_URL}/user/status/${status}`);
  return res.json();
}
export async function fetchUserByDate(date: string) {
  const res = await fetch(`${API_BASE_URL}/user/date/${date}`);
  return res.json();
}
export async function fetchUserByLocation(location: string) {
  const res = await fetch(`${API_BASE_URL}/user/location/${location}`);
  return res.json();
}
export async function fetchUserByTeam(team: string) {
  const res = await fetch(`${API_BASE_URL}/user/team/${team}`);
  return res.json();
}
export async function fetchUserByPosition(position: string) {
  const res = await fetch(`${API_BASE_URL}/user/position/${position}`);
  return res.json();
}
export async function fetchUserByAge(age: number) {
  const res = await fetch(`${API_BASE_URL}/user/age/${age}`);
  return res.json();
}

export default api;
