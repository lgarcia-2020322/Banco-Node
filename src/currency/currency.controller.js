//currency

import ExchangeRate from '../currency/currency.model.js'

export const getExchangeRate = async (req, res) => {
  try {
    const { from, to } = req.params
    const rate = await ExchangeRate.findOne({
      fromCurrency: from.toUpperCase(),
      toCurrency: to.toUpperCase(),
    })

    if (!rate) {
      return res.status(404).send({
        success: false,
        message: 'Exchange rate not found',
      })
    }

    return res.send({
      success: true,
      rate,
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Error fetching exchange rate',
      error: error.message,
    })
  }
}

export const upsertExchangeRate = async (req, res) => {
  try {
    const { fromCurrency, toCurrency, rate } = req.body

    if (!fromCurrency || !toCurrency || rate === undefined) {
      return res.status(400).send({
        success: false,
        message: 'Missing required fields',
      })
    }

    const updated = await ExchangeRate.findOneAndUpdate(
      { fromCurrency: fromCurrency.toUpperCase(), toCurrency: toCurrency.toUpperCase() },
      { rate, lastUpdated: new Date() },
      { new: true, upsert: true }
    )

    return res.send({
      success: true,
      rate: updated,
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Error updating exchange rate',
      error: error.message,
    })
  }
}