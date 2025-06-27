import Movement from './movement.model.js'
import Client from '../client/client.model.js'

// Crear movimiento (depósito o retiro)
export const createMovement = async (req, res) => {
  try {
    const { client: clientId, type, amount, currency, description } = req.body

    // Validación inicial
    if (!clientId || !type || !amount || !currency) {
      return res.status(400).json({ message: 'Faltan datos obligatorios' })
    }

    // Validar cliente
    const client = await Client.findById(clientId)
    if (!client) {
      return res.status(404).json({ message: 'Cliente no encontrado' })
    }

    let newBalance = client.balance

    // Aplicar lógica según tipo de movimiento
    switch (type) {
      case 'deposit':
        newBalance += amount
        break

      case 'withdrawal':
        if (client.balance < amount) {
          return res.status(400).json({ message: 'Saldo insuficiente' })
        }
        newBalance -= amount
        break

      default:
        return res.status(400).json({ message: 'Tipo de movimiento inválido' })
    }

    // Guardar nuevo balance
    client.balance = newBalance
    await client.save()

    // Crear y guardar movimiento (balanceAfter se calcula automáticamente)
    const movement = new Movement({
      client: clientId,
      type,
      amount,
      currency,
      balanceAfter: newBalance, // Calculado, no enviado por el usuario
      description,
    })

    await movement.save()

    return res.status(201).json({
      message: 'Movimiento registrado con éxito',
      movement,
      newBalance,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error al crear el movimiento', error })
  }
}

// Obtener todos los movimientos
export const getAllMovements = async (req, res) => {
  try {
    const movements = await Movement.find().populate('client', 'user balance')
    return res.json({ movements })
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener movimientos', error })
  }
}

// Obtener un movimiento por ID
export const getMovement = async (req, res) => {
  try {
    const { id } = req.params
    const movement = await Movement.findById(id).populate('client', 'user balance')
    if (!movement) return res.status(404).json({ message: 'Movimiento no encontrado' })
    return res.json({ movement })
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener movimiento', error })
  }
}

// Eliminar un movimiento (no revierte saldo)
export const deleteMovement = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Movement.findByIdAndDelete(id)
    if (!deleted) return res.status(404).json({ message: 'Movimiento no encontrado' })
    return res.json({ message: 'Movimiento eliminado', deleted })
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar movimiento', error })
  }
}