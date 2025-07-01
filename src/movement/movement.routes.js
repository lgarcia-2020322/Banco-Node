import { Router } from 'express'
import {
  createMovement,
  getAllMovements,
  getMovement,
  deleteMovement
} from './movement.controller.js'
import { validateJwt, isAdmin } from '../../middlewares/validate.jwt.js'
import { movementValidator, movementIdValidator } from '../../helpers/validators.js'

const api = Router()

api.post('/createMovement', [validateJwt, isAdmin, movementValidator], createMovement)
api.get('/getAllMovements', [validateJwt, isAdmin], getAllMovements)
api.get('/getMovement/id/:id', [validateJwt, isAdmin, movementIdValidator], getMovement)
api.delete('/deleteMovement/:id', [validateJwt, isAdmin, movementIdValidator], deleteMovement)

export default api
