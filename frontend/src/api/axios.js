import axios from "axios";

// Local dev: http://localhost:5000/api
// After backend deploy: change to your Render URL e.g. https://your-app.onrender.com/api
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const stored = localStorage.getItem("user");
  if (stored) {
    const user = JSON.parse(stored);
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  }
  return config;
});

export default API;
