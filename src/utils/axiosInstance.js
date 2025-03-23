import axios from 'axios'
import Cookies from 'js-cookie'
import router from '@/router'

const api = axios.create({
  baseURL: import.meta.env.VITE_BE_API_URL + 'api',
})

api.interceptors.request.use(
  async (config) => {
    const token = Cookies.get('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('token')
      router.push('/login')
    }
    return Promise.reject(error)
  },
)

export default api
