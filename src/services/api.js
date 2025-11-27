import axios from 'axios';

// ✅ AQUÍ ESTÁ EL CAMBIO CLAVE
// Reemplazamos 'http://localhost:8080' por tu IP de AWS
const api = axios.create({
  baseURL: 'http://98.93.215.197:8080', 
});

// Interceptor para seguridad (Token JWT)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
