//product
import Product from './product.model.js'

export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body)
    await product.save()

    return res.status(201).send({
      success: true,
      message: 'Product created successfully',
      product
    })
  } catch (err) {
    console.error(err)
    return res.status(500).send({ success: false, message: 'Error creating product', err })
  }
}

// Mostrar todos los productos (admin)
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()

    if (products.length === 0) {
      return res.status(404).send({
        success: false,
        message: 'No products found'
      })
    }

    return res.send({
      success: true,
      message: 'All products retrieved',
      products
    })
  } catch (err) {
    console.error(err)
    return res.status(500).send({
      success: false,
      message: 'Error retrieving all products',
      error: err.message
    })
  }
}


export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true })

    if (!updated) return res.status(404).send({ success: false, message: 'Product not found' })

    return res.send({ success: true, message: 'Product updated', updated })
  } catch (err) {
    return res.status(500).send({ success: false, message: 'Error updating product' })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params

    const product = await Product.findById(id)
    if (!product)
      return res.status(404).send({ success: false, message: 'Product not found' })

    product.status = false
    await product.save()

    return res.send({
      success: true,
      message: 'Product deleted (status set to false)',
      product
    })
  } catch (err) {
    console.error(err)
    return res.status(500).send({
      success: false,
      message: 'Error deleting product',
      error: err.message
    })
  }
}


