//auth
import { Router } from 'express'
import {
  loginAdmin,
  loginClient,
  registerClient
} from '../auth/auth.controller.js'

import {
  loginValidator,
  loginClientValidator,
  registerClientValidator
} from '../../helpers/validators.js' // asegúrate de tener estos definidos
import { isAdmin } from '../../middlewares/validate.jwt.js'

const api = Router()

// Login administrador
api.post(
  '/loginAdmin',
  [loginValidator],
  loginAdmin
)

// Registro de cliente (solo lo hace el admin)
api.post(
  '/registerClient',
  [registerClientValidator],
  registerClient
)

// Login cliente
api.post(
  '/loginClient',
  [loginClientValidator],
  loginClient
)

export default api