import { Router } from 'express'
import {
  createPurchase,
  getAllPurchases,
  getPurchase,
  updatePurchase,
  deletePurchase
} from './purchase.controller.js'

import { validateJwt, isAdmin } from '../../middlewares/validate.jwt.js'
import { purchaseValidator, purchaseIdValidator, updatePurchaseValidator} from '../../helpers/validators.js'

const api = Router()

api.post('/createPurchase', [validateJwt, isAdmin, purchaseValidator], createPurchase)
api.get('/getAllPurchases', [validateJwt, isAdmin], getAllPurchases)
api.get('/getPurchase/id/:id', [validateJwt, isAdmin, purchaseIdValidator], getPurchase)

api.put('/updatePurchase/:id', [
  validateJwt,
  isAdmin,
  purchaseIdValidator,
  updatePurchaseValidator
], updatePurchase)

api.delete('/deletePurchase/:id', [validateJwt, isAdmin, purchaseIdValidator], deletePurchase)

export default api
