//transfer
// Transfer routes

import { Router } from 'express'

import {
    createTransfer,
    getAllTransfers,
    getTransfer,
    updateTransfer
} from './transfer.controller.js'

import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'
import { transferValidator } from '../../helpers/validators.js'

const api = Router()

api.post(
    '/createTransfer',
    [validateJwt, isAdmin, transferValidator],
    createTransfer
)

api.get(
    '/getAllTransfers',
    [validateJwt, isAdmin],
    getAllTransfers
)

api.get(
    '/getTransferById/:id',
    [validateJwt, isAdmin],
    getTransfer
)

api.put(
    '/updateTransfer/:id',
    [validateJwt, isAdmin],
    updateTransfer
)

export default api
