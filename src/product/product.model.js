import { Schema, model } from 'mongoose'

const productSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      maxLength: [50, 'Product name must be at most 50 characters']
    },
    description: {
      type: String,
      maxLength: [200, 'Description must be at most 200 characters']
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0.01, 'Price must be greater than 0']
    },
    currency: {
      type: String,
      required: [true, 'Currency is required'],
      enum: ['USD', 'EUR', 'PEN'],
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)

export default model('Product', productSchema)