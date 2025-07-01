//purchase
import { Router } from 'express'
import {
  createPurchase,
  getAllPurchases,
  getPurchase,
  updatePurchase,
  deletePurchase
} from './purchase.controller.js'
import { validateJwt, isAdmin } from '../../middlewares/validate.jwt.js'

const api = Router()

api.post('/createPurchase', [validateJwt, isAdmin], createPurchase)
api.get('/getAllPurchases', [validateJwt, isAdmin], getAllPurchases)
api.get('/getPurchase/id/:id', [validateJwt, isAdmin], getPurchase)
api.put('/updatePurchase/:id', [validateJwt, isAdmin], updatePurchase)
api.delete('/deletePurchase/:id', [validateJwt, isAdmin], deletePurchase)

export default api