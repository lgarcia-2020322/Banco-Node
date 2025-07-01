import { Router } from 'express'
import {
  topClientsByMovements,
  totalTransferredByClientPerDay,
  mostPurchasedProducts
} from './report.controller.js'
import { validateJwt, isAdmin } from '../../middlewares/validate.jwt.js'

const api = Router()

api.get('/topClientsByMovements', [validateJwt, isAdmin], topClientsByMovements)
api.get('/totalTransferredByClientPerDay', [validateJwt, isAdmin], totalTransferredByClientPerDay)
api.get('/mostPurchasedProducts', [validateJwt, isAdmin], mostPurchasedProducts)

export default api
