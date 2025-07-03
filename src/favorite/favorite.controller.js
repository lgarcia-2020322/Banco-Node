//favorite
import Favorite from './favorite.model.js'

export const addFavorite = async (req, res) => {
  try {
    const data = req.body
    const favorite = new Favorite(data)
    await favorite.save()

    return res.status(201).send({
      success: true,
      message: 'Favorite added successfully',
      favorite
    })
  } catch (err) {
    console.error(err)
    return res.status(500).send({ success: false, message: 'Failed to add favorite', err })
  }
}

// Mostrar todos los favoritos (admin)
export const getAllFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find()
      .populate('currency')
      .populate('owner', 'accountNumber')

    if (favorites.length === 0) {
      return res.status(404).send({
        success: false,
        message: 'No favorites found'
      })
    }

    return res.send({
      success: true,
      message: 'All favorites retrieved',
      favorites
    })
  } catch (err) {
    console.error(err)
    return res.status(500).send({
      success: false,
      message: 'Error retrieving all favorites',
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

