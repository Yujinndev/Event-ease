import { Router } from 'express'
import {
  createNewEvent,
  deleteEvent,
  getAllEvents,
  getEventFullDetails,
  updateEvent,
} from '../controllers/eventContoller'

export const eventRouter = () => {
  const router = Router()

  router.get('/all', getAllEvents)
  router.get('/details/:id', getEventFullDetails)
  router.post('/create', createNewEvent)
  router.post('/update', updateEvent)
  router.post('/delete', deleteEvent)

  return router
}
