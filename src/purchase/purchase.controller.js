//purchase
import Purchase from './purchase.model.js'
import Client from '../client/client.model.js'
import Product from '../product/product.model.js'
import Movement from '../movement/movement.model.js'

// Utilidad para generar código de referencia único
const generateReferenceCode = () => {
  const now = new Date()
  const yyyy = now.getFullYear()
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')
  const hh = String(now.getHours()).padStart(2, '0')
  const min = String(now.getMinutes()).padStart(2, '0')
  const ss = String(now.getSeconds()).padStart(2, '0')
  const random = Math.floor(Math.random() * 9000 + 1000) // 4 dígitos aleatorios

  return `PUR-${yyyy}${mm}${dd}-${hh}${min}${ss}-${random}`
}

// Crear una compra y su movimiento automáticamente
export const createPurchase = async (req, res) => {
  try {
    const data = req.body

    const client = await Client.findById(data.client)
    if (!client) return res.status(404).json({ message: 'Cliente no encontrado' })

    const product = await Product.findById(data.product)
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' })

    // Validar saldo
    if (client.balance < data.amount) {
      return res.status(400).json({
        message: 'Saldo insuficiente',
        currentBalance: client.balance,
      })
    }

    // Actualizar saldo
    const newBalance = client.balance - data.amount
    client.balance = newBalance
    await client.save()

    // Generar código de referencia
    const referenceCode = generateReferenceCode()

    // Crear compra
    const purchase = new Purchase({
      ...data,
      referenceCode, // se añade automáticamente
    })
    await purchase.save()

    // Crear movimiento relacionado
    const movement = new Movement({
      client: data.client,
      type: 'purchase',
      amount: data.amount,
      currency: data.currency,
      balanceAfter: newBalance,
      referenceId: purchase._id,
      description: data.description || `Compra del producto ${product.name}`,
    })
    await movement.save()

    return res.status(201).json({
      message: 'Compra y movimiento registrados',
      purchase,
      movement,
      newBalance,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error al crear compra', error })
  }
}

// Obtener todas las compras
export const getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find()
      .populate('client', 'user balance')
      .populate('product', 'name price')
    return res.json({ purchases })
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener compras', error })
  }
}

// Obtener una compra por ID
export const getPurchase = async (req, res) => {
  try {
    const { id } = req.params
    const purchase = await Purchase.findById(id)
      .populate('client', 'user balance')
      .populate('product', 'name price')
    if (!purchase) return res.status(404).json({ message: 'Compra no encontrada' })
    return res.json({ purchase })
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener compra', error })
  }
}

// Actualizar una compra (no modifica balance ni movimiento)
export const updatePurchase = async (req, res) => {
  try {
    const { id } = req.params
    const updated = await Purchase.findByIdAndUpdate(id, req.body, { new: true })
    if (!updated) return res.status(404).json({ message: 'Compra no encontrada' })
    return res.json({ message: 'Compra actualizada', updated })
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar compra', error })
  }
}

// Eliminar una compra
export const deletePurchase = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Purchase.findByIdAndDelete(id)
    if (!deleted) return res.status(404).json({ message: 'Compra no encontrada' })
    return res.json({ message: 'Compra eliminada', deleted })
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar compra', error })
  }
}