//deposit
import Deposit from './deposit.model.js'

export const createDeposit = async (req, res) => {
  try {
    let data = req.body
    let deposit = new Deposit(data)

    await deposit.save()
    return res.send({
      success: true,
      message: 'Deposit created successfully',
      deposit,
    })
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: 'General error when creating deposit',
    })
  }
}

export const getAllDeposits = async (req, res) => {
  try {
    const { limit = 20, skip = 0 } = req.query

    const deposits = await Deposit.find()
      .skip(Number(skip))
      .limit(Number(limit))

    if (deposits.length === 0) {
      return res.status(404).send({
        success: false,
        message: 'No deposits found',
      })
    }

    return res.send({
      success: true,
      message: 'Deposits found',
      deposits,
      total: deposits.length,
    })
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: 'General error while fetching deposits',
      error: err,
    })
  }
}

export const getDeposit = async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).send({
        success: false,
        message: 'Parameter id is required',
      })
    }

    const deposit = await Deposit.findById(id)

    if (!deposit) {
      return res.status(404).send({
        success: false,
        message: 'Deposit not found',
      })
    }

    return res.send({
      success: true,
      message: 'Deposit found',
      deposit,
    })
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: 'General error while fetching deposit',
      error: err,
    })
  }
}

export const updateDeposit = async (req, res) => {
  try {
    const id = req.params.id
    const data = req.body

    if (!data.confirmation || data.confirmation !== 'YES') {
      return res.status(400).send({
        success: false,
        message: 'Confirmation not received. Please confirm the action by setting confirmation: "YES".',
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

    const updatedDeposit = await Deposit.findByIdAndUpdate(
      id,
      updatedFields,
      { new: true }
    )

    if (!updatedDeposit) {
      return res.status(404).send({
        success: false,
        message: 'Deposit not found and not updated.',
      })
    }

    return res.send({
      success: true,
      message: 'Deposit updated successfully.',
      updatedDeposit,
      updatedBy: user.name || user.id,
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Error updating deposit.',
      error: error.message,
    })
  }
}

export const cancelDeposit = async (req, res) => {
  try {
    const { id } = req.params
    const { confirmation } = req.body

    if (!confirmation || confirmation !== 'YES') {
      return res.status(400).send({
        success: false,
        message: 'Confirmation not received. Please confirm by setting confirmation: "YES".',
      })
    }

    const deposit = await Deposit.findById(id)
    if (!deposit) {
      return res.status(404).send({
        success: false,
        message: 'Deposit not found',
      })
    }

    deposit.status = 'rejected'
    await deposit.save()

    return res.send({
      success: true,
      message: 'Deposit cancelled successfully',
      deposit,
    })
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Error cancelling deposit',
      error: error.message,
    })
  }
}