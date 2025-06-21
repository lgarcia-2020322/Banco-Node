//client
import { Schema, model } from 'mongoose'

const clientSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
      unique: true
    },
    dpi: {
      type: String,
      required: [true, 'DPI is required'],
      unique: true,
      length: [13, 'DPI must be exactly 13 digits']
    },
    accountNumber: {
      type: String,
      required: [true, 'Account number is required'],
      unique: true,
      length: [10, 'Account number must be 10 digits']
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      maxLength: [100, 'Address must be at most 100 characters']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      minLength: [8, 'Phone must be at least 8 digits'],
      maxLength: [13, 'Phone must be at most 13 digits']
    },
    job: {
      type: String,
      required: [true, 'Job is required'],
      maxLength: [50, 'Job name must be at most 50 characters']
    },
    monthlyIncome: {
      type: Number,
      required: [true, 'Monthly income is required'],
      min: [100, 'Income must be at least Q100']
    },
    balance: {
      type: Number,
      default: 0
    },
    favorites: [{
      type: Schema.Types.ObjectId,
      ref: 'Favorite'
    }]
  },
  {
    timestamps: true
  }
)

export default model('Client', clientSchema)