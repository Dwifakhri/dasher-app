import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'

export async function loadLayoutMiddleware() {
  const router = useRouter()
  const token = Cookies.get('token')
  if (!token) {
    return router.push('/login')
  }
}

export default loadLayoutMiddleware
