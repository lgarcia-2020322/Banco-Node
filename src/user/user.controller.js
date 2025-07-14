//user.
import User from './user.model.js'

// Obtener todos los usuarios que NO son administradores
export const getUsers = async (req, res) => {
  try {
      const users = await User.find({
      role: { $ne: 'ADMIN' },
      status: true
    }).select('-password -__v')
    return res.send({ success: true, users })
  } catch (err) {
    console.error(err)
    return res.status(500).send({ success: false, message: 'Error getting users', error: err })
  }
}

// Obtener un usuario por ID (excepto admins)
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id).select('-password -__v')

    if (!user || user.role === 'ADMIN')
      return res.status(404).send({ success: false, message: 'User not found or unauthorized' })

    return res.send({ success: true, user })
  } catch (err) {
    console.error(err)
    return res.status(500).send({ success: false, message: 'Error getting user', error: err })
  }
}

// Actualizar datos del usuario (NO puede modificar password ni DPI)
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { name, surname, username, email } = req.body

    const user = await User.findById(id)
    if (!user || user.role === 'ADMIN')
      return res.status(404).send({ success: false, message: 'User not found or not editable' })

    if (username) user.username = username
    if (name) user.name = name
    if (surname) user.surname = surname
    if (email) user.email = email

    await user.save()
    return res.send({ success: true, message: 'User updated successfully', user })
  } catch (err) {
    console.error(err)
    return res.status(500).send({ success: false, message: 'Error updating user', error: err })
  }
}

// Eliminar usuario (no se puede eliminar admin)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)

    if (!user || user.role === 'ADMIN')
      return res.status(404).send({ success: false, message: 'User not found or cannot be deleted' })

    user.status = false
    await user.save()

    return res.send({ success: true, message: 'User disabled successfully' })
  } catch (err) {
    console.error(err)
    return res.status(500).send({ success: false, message: 'Error disabling user', error: err })
  }
}
export const searchUsersByName = async (req, res) => {
  try {
    const { name } = req.body

    if (!name || name.trim().length === 0)
      return res.status(400).send({ success: false, message: 'Name is required' })

    const regex = new RegExp(name, 'i') // búsqueda insensible a mayúsculas
    const users = await User.find({
      role: { $ne: 'ADMIN' },
      $or: [
        { name: regex },
        { surname: regex },
        { username: regex }
      ]
    }).select('-password -__v')

    if (!users.length)
      return res.status(404).send({ success: false, message: 'No users found' })

    return res.send({ success: true, users })
  } catch (err) {
    console.error(err)
    return res.status(500).send({ success: false, message: 'Error searching users', error: err })
  }
}
