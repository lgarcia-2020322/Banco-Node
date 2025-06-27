import { Schema, model } from 'mongoose'

const purchaseSchema = Schema(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
      required: [true, 'Client is required'],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product', // Referencia a ciegas
      required: [true, 'Product is required'],
    },
    amount: {
      type: Number,
      required: [true, 'Purchase amount is required'],
      min: [0.01, 'Amount must be greater than 0'],
    },
    currency: {
      type: String,
      required: [true, 'Currency is required'],
      enum: ['GTQ', 'USD', 'EUR'], // Puedes ampliar esta lista
    },
    description: {
      type: String,
      maxLength: [200, 'Description must be at most 200 characters'],
    },
    purchaseDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'completed',
    },
    referenceCode: {
      type: String,
      required: false,
      unique: true,
    },
  },
  { timestamps: true }
)

export default model('Purchase', purchaseSchema)
