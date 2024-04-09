import { Router } from 'express'
import { getUserFullDetails } from '../controllers/userController'

export const userRouter = () => {
  const router = Router()

  router.get('/details/:id', getUserFullDetails)

  return router
}
