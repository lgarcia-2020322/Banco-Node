//client
import { Router } from 'express'
import {
  getClients,
  getClientById,
  updateClient,
  deleteClient,
  getProfileClient
} from '../client/client.controller.js'

import {
  updateClientValidator
} from '../../helpers/validators.js'

import {
  validateJwt,
  isAdmin
} from '../../middlewares/validate.jwt.js'

const api = Router()

// Obtener todos los clientes (ADMIN)
api.get(
  '/all',
  [validateJwt, isAdmin],
  getClients
)

// Obtener cliente por ID (ADMIN)
api.get(
  '/:id',
  [validateJwt, isAdmin],
  getClientById
)

// Editar cliente (ADMIN)
api.put(
  '/:id',
  [validateJwt, isAdmin, updateClientValidator],
  updateClient
)

// Eliminar cliente (ADMIN)
api.delete(
  '/:id',
  [validateJwt, isAdmin],
  deleteClient
)

// Obtener perfil del cliente autenticado (CLIENT)
api.get(
  '/profile/me',
  [validateJwt],
  getProfileClient
)

export default api
