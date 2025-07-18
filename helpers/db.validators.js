// Validaciones con relacion entidad - base de datos
import User from '../src/user/user.model.js'
import Client from '../src/client/client.model.js'
import Transfer from '../src/transfer/transfer.model.js'
import Deposit from '../src/deposit/deposit.model.js'
import ExchangeRate from '../src/currency/currency.model.js'

// Verifica si el username ya existe
export const existUsername = async (username) => {
  const already = await User.findOne({ username })
  if (already) throw new Error(`Username ${username} is already taken`)
}

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

// Verifica si el email ya existe
export const existEmail = async (email) => {
  const already = await User.findOne({ email })
  if (already) throw new Error(`Email ${email} is already taken`)
}

// Verifica si el DPI ya existe
export const existDPI = async (dpi) => {
  const exists = await Client.findOne({ dpi })
  if (exists) throw new Error(`DPI already registered`)
}

// Verifica si un usuario existe por ID
export const findUser = async (id) => {
  try {
    const user = await User.findById(id)
    if (!user) return false
    return user
  } catch (err) {
    console.error(err)
    return false
  }
}