//transfer

import { Schema, model } from "mongoose";

const transferSchema = Schema(
  {
    amount: {
      type: Number,
      required: [true, 'Transfer amount is required'],
      min: [0.01, 'Amount must be greater than 0'],
    },
    currency: {
      type: String,
      required: [true, 'Currency is required'],
      enum: ['USD', 'EUR', 'GBP', 'JPY', 'PEN'],
    },
    fromAccount: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
      required: [true, 'Origin account is required'],
    },
    toAccount: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
      required: [true, 'Destination account is required'],
    },
    transferDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    description: {
      type: String,
      maxLength: [200, 'Description must be at most 200 characters'],
    },
    referenceCode: {
      type: String,
      unique: true,
      required: [true, 'Reference code is required'],
    },
    initiatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
      required: [true, 'User initiating transfer is required'],
    },
  },
  { timestamps: true }
)

export default model('Transfer', transferSchema)
