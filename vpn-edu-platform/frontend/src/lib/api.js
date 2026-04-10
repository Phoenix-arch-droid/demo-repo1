import axios from 'axios'

// In demo mode we talk directly to the backend on localhost:5000
// so the UI works even without the Vite dev proxy.
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

export const api = axios.create({
  baseURL,
  timeout: 15000,
})

