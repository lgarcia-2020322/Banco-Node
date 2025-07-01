//product
import Product from './product.model.js'

//Crear producto
export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body)
    await product.save()
    return res.status(201).json({ message: 'Producto creado', product })
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear producto', error })
  }
}

//Obtener todos los productos
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
    return res.json({ products })
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener productos', error })
  }
}

//Obtener producto por ID
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id)
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' })
    return res.json({ product })
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener producto', error })
  }
}

//Actualizar producto
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true })
    if (!updated) return res.status(404).json({ message: 'Producto no encontrado' })
    return res.json({ message: 'Producto actualizado', updated })
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar producto', error })
  }
}

//Eliminar producto
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Product.findByIdAndDelete(id)
    if (!deleted) return res.status(404).json({ message: 'Producto no encontrado' })
    return res.json({ message: 'Producto eliminado', deleted })
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar producto', error })
  }
}