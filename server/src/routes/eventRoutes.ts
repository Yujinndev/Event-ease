import { Router } from 'express'
import {
  createNewEvent,
  getAllEvents,
  getEventFullDetails,
} from '../controllers/eventContoller'

export const eventRouter = () => {
  const router = Router()

  router.get('/all', getAllEvents)
  router.get('/details/:id', getEventFullDetails)
  router.post('/create', createNewEvent)

  return router
}
