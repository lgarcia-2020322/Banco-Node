import { Schema, model } from 'mongoose'

const productSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      enum: ['savings_account', 'checking_account', 'credit_card', 'debit_card', 'loan'],
    },
    description: {
      type: String,
      maxLength: [200, 'Description must be at most 200 characters']
    },
    currency: {
      type: String,
      required: [true, 'Currency is required'],
      enum: ['GTQ', 'USD', 'EUR'],
    },
    interestRate: {
      type: Number,
      min: 0,
      default: 0,
    },
    maintenanceFee: {
      type: Number,
      min: 0,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)

export default model('Product', productSchema)