import { Router } from 'express'
import { registerUser, loginUser } from '../controllers/authController'

export const authRouter = () => {
  const router = Router()

  router.post('/register', registerUser)
  router.post('/login', loginUser)

  return router
}
