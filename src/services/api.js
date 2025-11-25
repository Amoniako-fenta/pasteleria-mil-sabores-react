import axios from 'axios';

// La URL base de tu Spring Boot
const api = axios.create({
  baseURL: 'http://localhost:8080',
});

// INTERCEPTOR (La parte clave de la seguridad):
// Antes de enviar cualquier petición, revisa si tenemos un token guardado
// y lo pega en la cabecera "Authorization".
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;