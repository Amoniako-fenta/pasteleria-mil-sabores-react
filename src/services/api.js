import axios from 'axios';

// ✅ CAMBIO IMPORTANTE:
// Como estás corriendo el backend en tu PC, usa 'localhost'.
// (Si estuvieras en AWS, aquí iría la IP pública).
const api = axios.create({
  baseURL: 'http://localhost:8080', 
});

// Interceptor para incluir el Token JWT automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;