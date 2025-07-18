//movement
import { Router } from 'express'
import {
  createMovement,
  getAllMovements,
  getMovement,
  deleteMovement
} from './movement.controller.js'
import { validateJwt, isAdmin } from '../../middlewares/validate.jwt.js'

const api = Router()

api.post('/createMovement', [validateJwt], createMovement)
api.get('/getAllMovements', [validateJwt], getAllMovements)
api.get('/getMovement/id/:id', [validateJwt], getMovement)
api.delete('/deleteMovement/:id', [validateJwt, isAdmin], deleteMovement)

export default api