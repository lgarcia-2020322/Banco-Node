//transfer

import Transfer from './transfer.model.js'

export const createTransfer = async (req, res) => {
  try {
    let data = req.body
    let transfer = new Transfer(data)

    await transfer.save()
    return res.send({
      success: true,
      message: 'Transfer created successfully',
      transfer
    })
  } catch (err) {
    return res.status(500).send({
      message: 'General error when creating transfer',
      success: false
    })
  }
}

export const getAllTransfers = async (req, res) => {
  try {
    const { limit = 20, skip = 0 } = req.query

    const transfers = await Transfer.find()
      .skip(skip)
      .limit(limit)

    if (transfers.length === 0) {
      return res.status(404).send({
        message: 'No transfers found',
        success: false,
      })
    }

    return res.send({
      success: true,
      message: 'Transfers found',
      transfers,
      total: transfers.length,
    })
  } catch (err) {
    console.error(err)
    return res.status(500).send({
      success: false,
      message: 'General error while fetching transfers',
      error: err,
    })
  }
}

export const getTransfer = async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).send({
        success: false,
        message: 'Parameter id is required',
      })
    }

    const transfer = await Transfer.findById(id)

    if (!transfer) {
      return res.status(404).send({
        success: false,
        message: 'Transfer not found',
      })
    }

    return res.send({
      success: true,
      message: 'Transfer found',
      transfer,
    })
  } catch (err) {
    console.error(err)
    return res.status(500).send({
      success: false,
      message: 'General error while fetching transfer',
      error: err,
    })
  }
}


export const cancelTransfer = async (req, res) => {
  try {
    const { id } = req.params
    const { confirmation } = req.body

    if (!confirmation || (confirmation !== 'YES' && confirmation !== 'NO')) {
      return res.status(400).send({
        success: false,
        message: 'Confirmation is required and must be either "YES" or "NO"',
      })
    }

    if (confirmation === 'NO') {
      return res.send({
        success: false,
        message: 'Transfer cancellation aborted by user confirmation',
      })
    }

    const transfer = await Transfer.findById(id)

    if (!transfer) {
      return res.status(404).send({
        success: false,
        message: 'Transfer not found',
      })
    }
    if (transfer.status === 'completed') {
      return res.status(400).send({
        success: false,
        message: 'Cannot cancel a completed transfer',
      })
    }

    transfer.status = 'failed'
    await transfer.save()

    return res.send({
      success: true,
      message: 'Transfer cancelled successfully',
    })
  } catch (error) {
    console.error(error)
    return res.status(500).send({
      success: false,
      message: 'Error cancelling transfer',
      error,
    })
  }
}

export const updateTransfer = async (req, res) => {
  try {
    const id = req.params.id
    const data = req.body

    if (!data.confirmation || data.confirmation !== 'YES') {
      return res.status(400).send({
        success: false,
        message:
          'Confirmation not received. Please confirm the action by setting confirmation: "YES".',
      })
    }

    const user = req.user
    if (!user) {
      return res.status(403).send({
        success: false,
        message: 'User not authenticated or not found.',
      })
    }

    const updatedFields = {
      ...data,
      updatedBy: user.name || user.id,
    }

    const updatedTransfer = await Transfer.findByIdAndUpdate(
      id,
      updatedFields,
      { new: true }
    )

    if (!updatedTransfer) {
      return res.status(404).send({
        success: false,
        message: 'Transfer not found and not updated.',
      })
    }

    return res.send({
      success: true,
      message: 'Transfer updated successfully.',
      updatedTransfer,
      updatedBy: user.name || user.id,
    })
  } catch (error) {
    console.error('Error updating transfer:', error)
    return res.status(500).send({
      success: false,
      message: 'Error updating transfer.',
      error: error.message,
    })
  }
}
