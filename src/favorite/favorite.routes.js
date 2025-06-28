import { Router } from 'express'
import {
  addFavorite,
  getFavoritesByClient,
  deleteFavorite
} from './favorite.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router()

//Agregar favorito
api.post('/addFavorite', validateJwt, addFavorite)

// Obtener favoritos de un cliente
api.get('/getFavoritesByClient/:clientId', validateJwt, getFavoritesByClient)

//Eliminar favorito
api.delete('/deleteFavorite/:id', validateJwt, deleteFavorite)

export default api