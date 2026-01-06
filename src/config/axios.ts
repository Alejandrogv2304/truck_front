import axios from "axios";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

// Interceptor para agregar el token en cada request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("AUTH_TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar respuestas y errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si el token expira o es inválido (401), limpiar y redirigir
    if (error.response?.status === 401) {
      localStorage.removeItem("AUTH_TOKEN");
      localStorage.removeItem("USER_NAME");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);


export default api;