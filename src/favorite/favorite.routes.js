//favorite
import { Router } from 'express'
import {
  addFavorite,
  getAllFavorites,
  deleteFavorite
} from './favorite.controller.js'

import { validateJwt, isAdmin } from '../../middlewares/validate.jwt.js'
import { favoriteValidator } from '../../helpers/validators.js'

const api = Router()

api.post(
  '/createFavorite',
  [validateJwt, favoriteValidator],
  addFavorite
)

api.get(
  '/getAllFavorites',
  [validateJwt, isAdmin],
  getAllFavorites
)

api.delete(
  '/deleteFavorite/:id',
  validateJwt,
  deleteFavorite
)

export default api