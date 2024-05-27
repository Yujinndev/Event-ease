import { Router } from 'express'
import {
  createNewTransaction,
  getAllTransactions,
  updateTransaction,
} from '../controllers/financeController'

export const financeRouter = () => {
  const router = Router()

  router.get('/all', getAllTransactions)
  router.post('/create', createNewTransaction)
  router.post('/update', updateTransaction)

  return router
}
