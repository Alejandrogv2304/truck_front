import axios from "axios";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

// Adjuntar token en cada petición
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("AUTH_TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiró o es inválido
      localStorage.removeItem("AUTH_TOKEN");
      window.location.href = "/auth/login"; // 🔄 Fuerza redirección
    }
    return Promise.reject(error);
  }
);


export default api;