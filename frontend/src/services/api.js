import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
})

// ── Response interceptor for error normalization ──────────────────────────────
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      'An unexpected error occurred'
    return Promise.reject(new Error(Array.isArray(message) ? message.join(', ') : message))
  }
)

// ── Students API ──────────────────────────────────────────────────────────────
export const studentsApi = {
  getAll:   ()           => api.get('/students').then((r) => r.data),
  getOne:   (id)         => api.get(`/students/${id}`).then((r) => r.data),
  create:   (data)       => api.post('/students', data).then((r) => r.data),
  update:   (id, data)   => api.patch(`/students/${id}`, data).then((r) => r.data),
  remove:   (id)         => api.delete(`/students/${id}`).then((r) => r.data),
}

export default api
