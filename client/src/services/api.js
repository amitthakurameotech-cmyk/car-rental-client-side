import axios from "axios";

const api = axios.create({
    // baseURL: "https://autorentx.onrender.com",
    baseURL: "http://localhost:8080", 
});
// Helper to build absolute URL for resources returned by the backend (like images).
export function absUrl(path) {
  if (!path) return path;
  
  // If backend already returned a full absolute URL (http/https), use it unchanged.
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  // Otherwise build absolute URL using the API baseURL for relative paths
  const base = (api.defaults.baseURL || "").replace(/\/$/, "");
  const p = String(path).replace(/^\/+/, "");
  return `${base}/${p}`;
}

export default api;
