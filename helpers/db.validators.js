// Validaciones con relacion entidad - base de datos

import Client from '../src/client/client.model.js'  
import Transfer from '../src/transfer/transfer.model.js'
import Deposit from '../src/deposit/deposit.model.js'
import ExchangeRate from '../src/currency/currency.model.js'

export const existClient = async (id) => {
  const client = await Client.findById(id)
  if (!client) {
    console.error(`Client with ID ${id} does not exist`)
    throw new Error(`Client with ID ${id} does not exist`)
  }
  return true
}

export const referenceCodeIsUnique = async (referenceCode = '') => {
  const exist = await Transfer.findOne({ referenceCode })
  if (exist) {
    console.error(`Reference code ${referenceCode} already exists`)
    throw new Error(`Reference code ${referenceCode} already exists`)
  }
  return true
}

export const transferExists = async (id) => {
  const transfer = await Transfer.findById(id)
  if (!transfer) {
    console.error(`Transfer with ID ${id} does not exist`)
    throw new Error(`Transfer with ID ${id} does not exist`)
  }
  return true
}

export const depositExists = async (id) => {
  const deposit = await Deposit.findById(id)
  if (!deposit) throw new Error(`Deposit with ID ${id} does not exist`)
  return true
}

export const uniqueReferenceCodeDeposit = async (referenceCode = '') => {
  const exist = await Deposit.findOne({ referenceCode })
  if (exist) throw new Error(`Reference code ${referenceCode} already exists`)
  return true
}


export const exchangeRateExists = async (id) => {
  const exchangeRate = await ExchangeRate.findById(id)
  if (!exchangeRate) throw new Error(`ExchangeRate with ID ${id} does not exist`)
  return true
}