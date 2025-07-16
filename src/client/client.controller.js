//client
import Client from '../client/client.model.js'
import User from '../user/user.model.js'

// Obtener todos los clientes
export const getClients = async (req, res) => {
  try {
    const clients = await Client.find()
      .populate('user', '-password -__v')
      .select('-__v')

    if (clients.length === 0) {
      return res.status(404).send({ message: 'No clients found', success: false })
    }

    return res.send({
      message: 'Clients found',
      success: true,
      total: clients.length,
      clients
    })
  } catch (err) {
    console.error(err)
    return res.status(500).send({ message: 'Error retrieving clients', error: err })
  }
}

// Obtener cliente por ID
export const getClientById = async (req, res) => {
  try {
    const { id } = req.params
    const client = await Client.findById(id).populate('user', '-password -__v')
    if (!client) return res.status(404).send({ success: false, message: 'Client not found' })
    return res.send({ success: true, client })
  } catch (err) {
    console.error(err)
    return res.status(500).send({ success: false, message: 'Error getting client', error: err })
  }
}

// Editar datos permitidos del cliente (nombre, dirección, trabajo, ingresos)
export const updateClient = async (req, res) => {
  try {
    console.log('BODY RECIBIDO EN BACKEND:', req.body) 

    const { id } = req.params
    const { address, job, monthlyIncome, currency } = req.body

    const client = await Client.findById(id)
    if (!client)
      return res.status(404).send({ success: false, message: 'Client not found' })

    const income = Number(monthlyIncome)
    if (isNaN(income) || income < 100)
      return res.status(400).send({ success: false, message: 'Monthly income must be at least Q100' })

    if (address) client.address = address
    if (job) client.job = job
    if (monthlyIncome) client.monthlyIncome = income
    if (currency) client.currency = currency

    await client.save()
    return res.send({ success: true, message: 'Client updated', client })
  } catch (err) {
    console.error('ERROR AL ACTUALIZAR CLIENTE:', err)
    return res.status(500).send({ success: false, message: 'Error updating client', error: err })
  }
}


// Eliminar cliente (elimina el usuario y cliente asociados)
export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params
    const client = await Client.findById(id).populate('user')

    if (!client || client.user.role === 'ADMIN')
      return res.status(404).send({ success: false, message: 'Client not found or cannot be disabled' })

    // Desactivar el usuario vinculado
    client.user.status = false
    await client.user.save()

    // Puedes también marcar algo en Client si deseas (opcional)
    return res.send({ success: true, message: 'Client disabled successfully' })
  } catch (err) {
    console.error(err)
    return res.status(500).send({ success: false, message: 'Error disabling client', error: err })
  }
}

// Obtener perfil del cliente autenticado
export const getProfileClient = async (req, res) => {
  try {
    const userId = req.user.uid
    const client = await Client.findOne({ user: userId })
      .populate('user', '-password -__v')
      .select('-__v')

    if (!client) {
      return res.status(404).send({ success: false, message: 'Client not found' })
    }

    return res.send({
      message: 'Client profile found',
      success: true,
      client
    })
  } catch (err) {
    console.error(err)
    return res.status(500).send({ message: 'Error fetching profile', error: err })
  }
}
