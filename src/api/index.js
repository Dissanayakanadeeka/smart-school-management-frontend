// In your axios setup file (e.g., api.js)
import axios from 'axios';


const api = axios.create({
  baseURL: "http://localhost:8080/",
 // Adjust to your API's base URL

});

// Add interceptor for JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  console.log("TOKEN:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;