import useAuthStore from '@/services/state/useAuthStore'
import { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const auth = useAuthStore.getState().user
  const navigate = useNavigate()

  useEffect(() => {
    if (auth === null) {
      navigate('/signin', { replace: true })
    }
  }, [navigate, auth])

  return <Outlet />
}

export default ProtectedRoute
