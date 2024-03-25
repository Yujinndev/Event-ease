import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { useAuth } from './AuthProvider'

export default function ProtectedRoute() {
  const user = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user === null) {
      navigate('/signin', { replace: true })
    }
  }, [navigate, user])

  return <Outlet />
}
