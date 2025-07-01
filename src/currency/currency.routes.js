import { Router } from 'express'
import { getExchangeRate, upsertExchangeRate } from './currency.controller.js'
import { exchangeRateValidator } from '../../helpers/validators.js'

const api = Router()

api.get('/rate/:from/:to', getExchangeRate)
api.post('/rate', exchangeRateValidator, upsertExchangeRate)

export default api