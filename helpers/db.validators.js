// Validaciones con relacion entidad - base de datos
import User from '../src/user/user.model.js'
import Client from '../src/client/client.model.js'

// Verifica si el username ya existe
export const existUsername = async (username) => {
  const already = await User.findOne({ username })
  if (already) throw new Error(`Username ${username} is already taken`)
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