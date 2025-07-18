// models/User.js
import { Schema, model } from 'mongoose'

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      maxLength: [25, `Can't exceed 25 characters`]
    },
    surname: {
      type: String,
      required: [true, 'Surname is required'],
      maxLength: [25, `Can't exceed 25 characters`]
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      maxLength: [50, `Can't exceed 50 characters`]
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required']
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: [8, 'Password must be at least 8 characters'],
      maxLength: [100, `Can't exceed 100 characters`]
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      uppercase: true,
      enum: ['ADMIN', 'CLIENT']
    },
    status: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
)

userSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject()
  return user
}

export default model('User', userSchema)
