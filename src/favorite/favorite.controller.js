import Favorite from './favorite.model.js'
import Client from '../client/client.model.js'
import Product from '../product/product.model.js'

//Agregar producto a favoritos
export const addFavorite = async (req, res) => {
  try {
    const { clientId, productId } = req.body

    const client = await Client.findById(clientId)
    if (!client) return res.status(404).json({ message: 'Cliente no encontrado' })

    const product = await Product.findById(productId)
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' })

    //Crear favorito
    const favorite = new Favorite({ client: clientId, product: productId })
    await favorite.save()

    //Agregar referencia en el cliente
    client.favorites.push(favorite._id)
    await client.save()

    return res.status(201).json({ message: 'Producto agregado a favoritos', favorite })
  } catch (error) {
    return res.status(500).json({ message: 'Error al agregar favorito', error })
  }
}

//Obtener favoritos de un cliente
export const getFavoritesByClient = async (req, res) => {
  try {
    const { clientId } = req.params
    const favorites = await Favorite.find({ client: clientId }).populate('product', 'name price')

    return res.json({ favorites })
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener favoritos', error })
  }
}

//Eliminar un favorito
export const deleteFavorite = async (req, res) => {
  try {
    const { id } = req.params

    const favorite = await Favorite.findByIdAndDelete(id)
    if (!favorite) return res.status(404).json({ message: 'Favorito no encontrado' })

    //Remover referencia en el cliente
    await Client.findByIdAndUpdate(favorite.client, { $pull: { favorites: id } })

    return res.json({ message: 'Favorito eliminado', favorite })
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar favorito', error })
  }
}