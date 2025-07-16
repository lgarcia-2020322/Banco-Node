//favorite
import Favorite from './favorite.model.js'

export const addFavorite = async (req, res) => {
  try {
    const { alias, accountNumber, bankName, currency } = req.body

    if (!req.user?.uid) {
      return res.status(401).send({ success: false, message: 'Usuario no autenticado' })
    }

    const favorite = new Favorite({
      owner: req.user.uid, 
      alias,
      accountNumber,
      bankName,
      currency
    })

    await favorite.save()

    return res.status(201).send({
      success: true,
      message: 'Favorite added successfully',
      favorite
    })
  } catch (err) {
    console.error('❌ Error al agregar favorito:', err)
    return res.status(500).send({
      success: false,
      message: 'Failed to add favorite',
      error: err.message,
      stack: err.stack
    })
  }
}


// Mostrar todos los favoritos (admin)
export const getAllFavorites = async (req, res) => {
  try {
    const ownerId = req.user.uid // ✅ CAMBIO CLAVE
    const favorites = await Favorite.find({ owner: ownerId, status: true })

    return res.send({
      success: true,
      message: 'Favorites retrieved',
      favorites
    })
  } catch (err) {
    console.error(err)
    return res.status(500).send({
      success: false,
      message: 'Error retrieving favorites',
      error: err.message
    })
  }
}

export const deleteFavorite = async (req, res) => {
  try {
    const { id } = req.params
    const favorite = await Favorite.findById(id)

    if (!favorite) return res.status(404).send({ success: false, message: 'Favorite not found' })

    favorite.status = false
    await favorite.save()

    return res.send({ success: true, message: 'Favorite deactivated' })
  } catch (err) {
    return res.status(500).send({ success: false, message: 'Error deleting favorite' })
  }
}

