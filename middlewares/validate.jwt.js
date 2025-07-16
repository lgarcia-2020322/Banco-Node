'use strict'

import jwt from 'jsonwebtoken'
import { findUser } from '../helpers/db.validators.js'

export const validateJwt = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) return res.status(401).send({ message: 'Unauthorized - No token provided' })

    const user = jwt.verify(token, process.env.SECRET_KEY)

    const validateUser = await findUser(user.uid)
    if (!validateUser) {
      return res.status(404).send({
        success: false,
        message: 'User not found - Unauthorized'
      })
    }

    // ✅ INCLUIR role y username en req.user
    req.user = {
      uid: user.uid,
      role: user.role,
      username: user.username
    }

    next()
  } catch (err) {
    console.error('❌ JWT error:', err)
    return res.status(401).send({ message: 'Invalid token or expired' })
  }
}

export const isAdmin = async (req, res, next) => {
  try {
    const { user } = req
    if (!user || user.role !== 'ADMIN') {
      return res.status(403).send({
        success: false,
        message: `You don't have access | username ${user?.username || 'unknown'}`
      })
    }
    next()
  } catch (err) {
    console.error(err)
    return res.status(403).send({
      success: false,
      message: 'Unauthorized role'
    })
  }
}
