// Validaciones con relacion entidad - base de datos
import User from '../src/user/user.model.js'
import Purchase from '../src/purchase/purchase.model.js'
import Product from '../src/product/product.model.js'
import Movement from '../src/movement/movement.model.js'

export const findUser = async(id)=>{
    try{
        const userExist = await User.findById(id)
        if(!userExist) return false
        return userExist
    }catch(err){
        console.error(err)
        return false
    }
}

export const existClient = async (id) => {
  const client = await Client.findById(id)
  if (!client) {
    console.error(`Client with ID ${id} does not exist`)
    throw new Error(`Client with ID ${id} does not exist`)
  }
  return true
}


// Verifica si existe una compra por ID
export const purchaseExists = async (id) => {
  const purchase = await Purchase.findById(id)
  if (!purchase) {
    throw new Error(`Purchase with ID ${id} does not exist`)
  }
  return true
}

// Verifica si el referenceCode de la compra es único
export const uniqueReferenceCodePurchase = async (referenceCode = '') => {
  const exists = await Purchase.findOne({ referenceCode })
  if (exists) throw new Error(`Reference code ${referenceCode} already exists`)
  return true
}

// Verifica si el producto existe
export const productExists = async (id) => {
  const product = await Product.findById(id)
  if (!product) throw new Error(`Product with ID ${id} does not exist`)
  return true
}

// Verifica si un movimiento existe por ID
export const movementExists = async (id) => {
  const movement = await Movement.findById(id)
  if (!movement) throw new Error(`Movement with ID ${id} does not exist`)
  return true
}