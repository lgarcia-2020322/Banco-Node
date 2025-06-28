//deposit

import { Router } from 'express'
import {
  createDeposit,
  getAllDeposits,
  getDeposit,
  updateDeposit,
  cancelDeposit,
} from './deposit.controller.js'

import { validateJwt, isAdmin } from '../../middlewares/validate.jwt.js'
import { depositValidator } from '../../helpers/validators.js'

const api = Router()

api.post(
  '/createDeposit',
  [validateJwt, isAdmin, depositValidator],
  createDeposit
)

api.get(
  '/getAllDeposits',
  [validateJwt, isAdmin],
  getAllDeposits
)

api.get(
  '/getDepositById/:id',
  [validateJwt, isAdmin],
  getDeposit
)

api.put(
  '/updateDeposit/:id',
  [validateJwt, isAdmin],
  updateDeposit
)

api.put(
  '/cancelDeposit/:id',
  [validateJwt, isAdmin],
  cancelDeposit
)

export default api
