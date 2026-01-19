import axios from "axios"

// Ensure baseURL ALWAYS ends with a slash (FastAPI-safe)
const rawBaseURL = import.meta.env.VITE_API_BASE_URL

if (!rawBaseURL) {
  console.error("❌ VITE_API_BASE_URL is not defined")
}

const baseURL = rawBaseURL.replace(/\/?$/, "/")

const api = axios.create({
  baseURL,               // e.g. https://net-flow-production.up.railway.app/
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
})

// Attach access token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }

    return Promise.reject(error)
  }
)

export default api
