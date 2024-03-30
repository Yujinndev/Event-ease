import useAuthStore from '@/services/state/useAuthStore'
import { useLocation, Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const location = useLocation()
  const auth = useAuthStore.getState().auth

  return auth?.user ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  )
}

export default ProtectedRoute
