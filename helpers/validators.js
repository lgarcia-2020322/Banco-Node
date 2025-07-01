// validaciones de modelos
import { body, param } from 'express-validator'
import { validateErrors } from './validate.error.js'
import {
  existClient,
  productExists,
  uniqueReferenceCodePurchase,
  purchaseExists,
  movementExists 
} from './db.validators.js'


export const purchaseValidator = [
  body('client', 'Client is required and must be a valid ID')
    .notEmpty()
    .isMongoId()
    .bail()
    .custom(existClient),

  body('product', 'Product is required and must be a valid ID')
    .notEmpty()
    .isMongoId()
    .bail()
    .custom(productExists),

  body('amount', 'Amount is required and must be greater than 0')
    .notEmpty()
    .isFloat({ gt: 0 }),

  body('currency', 'Currency must be one of: GTQ, USD, EUR')
    .notEmpty()
    .isIn(['GTQ', 'USD', 'EUR']),

  body('description')
    .optional()
    .isString()
    .isLength({ max: 200 })
    .withMessage('Description must be at most 200 characters'),

  body('status')
    .optional()
    .isIn(['pending', 'completed', 'failed'])
    .withMessage('Status must be one of: pending, completed, failed'),

  validateErrors
]

export const purchaseIdValidator = [
  param('id')
    .isMongoId().withMessage('Invalid purchase ID')
    .bail()
    .custom(purchaseExists),
  validateErrors
]

export const updatePurchaseValidator = [
  body('client')
    .optional()
    .isMongoId().withMessage('Client must be a valid ID')
    .bail()
    .custom(existClient),

  body('product')
    .optional()
    .isMongoId().withMessage('Product must be a valid ID')
    .bail()
    .custom(productExists),

  body('amount')
    .optional()
    .isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),

  body('currency')
    .optional()
    .isIn(['GTQ', 'USD', 'EUR']).withMessage('Invalid currency'),

  body('description')
    .optional()
    .isString()
    .isLength({ max: 200 }),

  body('status')
    .optional()
    .isIn(['pending', 'completed', 'failed']),

  // Si permites cambiar el referenceCode, valida que no esté repetido
  body('referenceCode')
    .optional()
    .isString()
    .bail()
    .custom(uniqueReferenceCodePurchase),

  validateErrors
]

export const movementValidator = [
  body('client')
    .notEmpty().withMessage('Client is required')
    .isMongoId().withMessage('Client must be a valid Mongo ID')
    .bail()
    .custom(existClient),

  body('type')
    .notEmpty().withMessage('Type is required')
    .isIn(['deposit', 'withdrawal', 'transfer', 'purchase'])
    .withMessage('Type must be one of: deposit, withdrawal, transfer, purchase'),

  body('amount')
    .notEmpty().withMessage('Amount is required')
    .isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),

  body('currency')
    .notEmpty().withMessage('Currency is required')
    .isIn(['GTQ', 'USD', 'EUR'])
    .withMessage('Currency must be one of: GTQ, USD, EUR'),

  body('balanceAfter')
    .notEmpty().withMessage('Balance after is required')
    .isFloat({ min: 0 }).withMessage('Balance after must be a valid number'),

  body('description')
    .optional()
    .isString()
    .isLength({ max: 200 })
    .withMessage('Description must be at most 200 characters'),

  validateErrors
]

export const movementIdValidator = [
  param('id')
    .isMongoId().withMessage('Invalid movement ID')
    .bail()
    .custom(movementExists),
  validateErrors
]