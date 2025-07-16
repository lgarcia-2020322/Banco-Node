//Middleware de validación de tokens
'use strict'

import jwt from 'jsonwebtoken'
import { findUser } from '../helpers/db.validators.js'

//Validar que venga un token válido y no haya expirado
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

    req.user = user
    next()
  } catch (err) {
    console.error('❌ JWT error:', err)
    return res.status(401).send({ message: 'Invalid token or expired' })
  }
}

//Validación por roles (Después de la validación del token)
export const isAdmin = async(req, res, next)=>{
    try{
        const { user } = req
        if(!user  || user.role !== 'ADMIN') return res.status(403).send(
            {
                success: false,
                message: `You dont have access | username ${user.username}`
            }
        )
        next()
    }catch(err){
        console.error(err)
        return res.status(403).send(
            {
                success: false,
                message: 'Unauthorized role'
            }
        )
    }
}