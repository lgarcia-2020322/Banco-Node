import { Schema, model } from 'mongoose'

const movementSchema = Schema(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
      required: [true, 'Client is required'],
    },
    type: {
      type: String,
      enum: ['deposit', 'withdrawal', 'transfer', 'purchase'],
      required: [true, 'Movement type is required'],
    },
    amount: {
      type: String,
      required: [true, 'Amount is required'],
      min: [0.01, 'Amount must be greater than 0'],
    },
    currency: {
      type: String,
      required: [true, 'Currency is required'],
      enum: ['GTQ', 'USD', 'EUR'], // Referencia a currency a ciegas
    },
    balanceAfter: {
      type: Number,
      required: [true, 'Balance after movement is required'],
    },
    referenceId: {
      type: Schema.Types.ObjectId,
      required: false, // Referencia opcional al origen de la transacción
    },
    description: {
      type: String,
      maxLength: [200, 'Description must be at most 200 characters'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
)

export default model('Movement', movementSchema)