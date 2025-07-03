//product
import { Router } from 'express'
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
} from './product.controller.js'

import { validateJwt, isAdmin } from '../../middlewares/validate.jwt.js'
import { createProductValidator } from '../../helpers/validators.js'

const api = Router()

api.post(
  '/createProduct',
  [validateJwt, isAdmin, createProductValidator],
  createProduct
)

api.get(
  '/getAllProducts',
  [validateJwt, isAdmin],
  getAllProducts
)

api.put(
  '/updateProduct/:id',
  [validateJwt, isAdmin],
  updateProduct
)

api.delete(
  '/deleteProduct/:id',
  [validateJwt, isAdmin],
  deleteProduct
)

export default api
