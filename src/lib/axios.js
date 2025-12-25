import axios from 'axios'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'
import { config } from '../config/environment'

const api = axios.create({
  baseURL: config.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
      window.location.href = '/login'
      toast.error('Session expirée. Veuillez vous reconnecter.')
    } else if (error.response?.status === 403) {
      toast.error('Vous n\'avez pas les permissions nécessaires.')
    } else if (error.response?.status >= 500) {
      toast.error('Erreur serveur. Veuillez réessayer plus tard.')
    }
    return Promise.reject(error)
  }
)

export default api
