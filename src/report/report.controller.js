import Movement from '../movement/movement.model.js'
import Transfer from '../transfer/transfer.model.js'
import Purchase from '../purchase/purchase.model.js'
import Client from '../client/client.model.js'
import Product from '../product/product.model.js'

// Clientes con más movimientos
export const topClientsByMovements = async (req, res) => {
  try {
    const result = await Movement.aggregate([
      {
        $group: {
          _id: '$client',
          totalMovements: { $sum: 1 }
        }
      },
      { $sort: { totalMovements: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'clients',
          localField: '_id',
          foreignField: '_id',
          as: 'client'
        }
      },
      { $unwind: '$client' },
      {
        $project: {
          _id: 0,
          clientId: '$client._id',
          name: '$client.name',
          surname: '$client.surname',
          totalMovements: 1
        }
      }
    ])

    res.json(result)
  } catch (err) {
    res.status(500).json({ message: 'Error generating report', error: err.message })
  }
}

// Total transferido por cliente por día
export const totalTransferredByClientPerDay = async (req, res) => {
  try {
    const result = await Transfer.aggregate([
      {
        $group: {
          _id: {
            client: '$fromAccount',
            date: { $dateToString: { format: '%Y-%m-%d', date: '$transferDate' } }
          },
          totalTransferred: { $sum: '$amount' }
        }
      },
      {
        $lookup: {
          from: 'clients',
          localField: '_id.client',
          foreignField: '_id',
          as: 'client'
        }
      },
      { $unwind: '$client' },
      {
        $project: {
          _id: 0,
          clientId: '$client._id',
          name: '$client.name',
          surname: '$client.surname',
          date: '$_id.date',
          totalTransferred: 1
        }
      },
      { $sort: { date: -1, totalTransferred: -1 } }
    ])

    res.json(result)
  } catch (err) {
    res.status(500).json({ message: 'Error generating report', error: err.message })
  }
}

// Productos más comprados
export const mostPurchasedProducts = async (req, res) => {
  try {
    const result = await Purchase.aggregate([
      {
        $group: {
          _id: '$product',
          totalAmountPurchased: { $sum: '$amount' },
          timesPurchased: { $sum: 1 }
        }
      },
      { $sort: { totalAmountPurchased: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $project: {
          _id: 0,
          productId: '$product._id',
          name: '$product.name',
          totalAmountPurchased: 1,
          timesPurchased: 1
        }
      }
    ])

    res.json(result)
  } catch (err) {
    res.status(500).json({ message: 'Error generating report', error: err.message })
  }
}