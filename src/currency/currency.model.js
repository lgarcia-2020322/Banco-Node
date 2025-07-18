//currency

import { Schema, model } from 'mongoose'

const exchangeRateSchema = new Schema({
  fromCurrency: {
    type: String,
    required: true,
    uppercase: true,
    minlength: 3,
    maxlength: 3,
  },
  toCurrency: {
    type: String,
    required: true,
    uppercase: true,
    minlength: 3,
    maxlength: 3,
  },
  rate: {
    type: Number,
    required: true,
    min: 0,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
})

export default model('ExchangeRate', exchangeRateSchema)