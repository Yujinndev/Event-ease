import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { registerUser, loginUser } from '../controllers/authController'

export const authRouter = (prisma: PrismaClient) => {
  const router = Router()

  router.post('/register', registerUser(prisma))
  router.post('/login', loginUser(prisma))

  return router
}
