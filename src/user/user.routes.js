//user.
import { Router } from 'express'
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../user/user.controller.js'

import {
  updateUserValidator
} from '../../helpers/validators.js'

import {
  validateJwt,
  isAdmin
} from '../../middlewares/validate.jwt.js'

const api = Router()

// Obtener todos los usuarios (excepto ADMIN)
api.get(
  '/all',
  [validateJwt, isAdmin],
  getUsers
)

// Obtener usuario por ID (excepto ADMIN)
api.get(
  '/:id',
  [validateJwt, isAdmin],
  getUserById
)

// Editar usuario (excepto password y DPI)
api.put(
  '/:id',
  [validateJwt, isAdmin, updateUserValidator],
  updateUser
)

// Eliminar usuario (excepto ADMIN)
api.delete(
  '/:id',
  [validateJwt, isAdmin],
  deleteUser
)

export default api
