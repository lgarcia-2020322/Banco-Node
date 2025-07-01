//product
import { Router } from 'express'
import {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct
} from './product.controller.js'
import { validateJwt, isAdmin } from '../../middlewares/validate.jwt.js'

const api = Router()

//Crear producto (solo Admin)
api.post('/createProduct', [validateJwt, isAdmin], createProduct)

//Obtener todos los productos
api.get('/getAllProducts', validateJwt, getAllProducts)

//Obtener producto por ID
api.get('/getProduct/:id', validateJwt, getProduct)

//Actualizar producto (solo Admin)
api.put('/updateProduct/:id', [validateJwt, isAdmin], updateProduct)

//Eliminar producto (solo Admin)
api.delete('/deleteProduct/:id', [validateJwt, isAdmin], deleteProduct)

export default api