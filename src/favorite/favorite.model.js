import { Schema, model } from 'mongoose'

const favoriteSchema = Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
      required: [true, 'Owner client is required']
    },
    alias: {
      type: String,
      required: [true, 'Alias is required'],
      maxLength: [50, 'Alias must be at most 50 characters']
    },
    accountNumber: {
      type: String,
      required: [true, 'Target account number is required'],
      minLength: [10, 'Account number must be exactly 10 digits'],
      maxLength: [10, 'Account number must be exactly 10 digits']
    },
    bankName: {
      type: String,
      required: [true, 'Bank name is required'],
      maxLength: [100, 'Bank name must be at most 100 characters']
    },
    currency: {
      type: String,
      required: [true, 'Currency is required'],
      enum: ['USD', 'EUR', 'PEN'],
    },
    status: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)

export default model('Favorite', favoriteSchema)