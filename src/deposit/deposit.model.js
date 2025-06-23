//deposit

import { Schema, model } from "mongoose";

const depositSchema = Schema(
  {
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0.01, 'Amount must be greater than 0'],
    },
    currency: {
      type: String,
      required: [true, 'Currency is required'],
      enum: ['USD', 'EUR', 'PEN'],
    },
    account: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
      required: [true, 'Account is required'],
    },
    depositDate: {
      type: Date,
      default: Date.now,
    },
    method: {
      type: String,
      enum: ['cash', 'external_transfer', 'check'],
      required: [true, 'Deposit method is required'],
    },
    referenceCode: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'rejected'],
      default: 'pending',
    },
    initiatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
    },
  },
  { timestamps: true }
)

export default model('Deposit', depositSchema)
