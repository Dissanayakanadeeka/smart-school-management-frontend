import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  withCredentials: true  // if using cookies
});

export async function fetchListings(){
  const res = await api.get("/auth/login");
  return res.data;
}