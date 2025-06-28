// validaciones de modelos
import { body } from 'express-validator'
import { validateErrors } from './validate.error.js'
import { existClient,uniqueReferenceCodeDeposit, referenceCodeIsUnique } from './db.validators.js'


export const transferValidator = [
  body('amount', 'Amount is required and must be greater than 0')
    .notEmpty()
    .isFloat({ gt: 0 }),

  body('currency', 'Currency must be one of: USD, EUR, GBP, JPY, PEN')
    .notEmpty()
    .isIn(['USD', 'EUR', 'GBP', 'JPY', 'PEN']),

  body('fromAccount', 'FromAccount is required and must be a valid user ID')
    .notEmpty()
    .isMongoId()
    .bail()
    .custom(existClient),

  body('toAccount', 'ToAccount is required and must be a valid user ID')
    .notEmpty()
    .isMongoId()
    .bail()
    .custom(existClient)
    .custom((value, { req }) => {
      if (value === req.body.fromAccount) {
        throw new Error('Origin and destination accounts must be different')
      }
      return true
    }),

  body('referenceCode', 'Reference code is required and must be unique')
    .notEmpty()
    .isString()
    .bail()
    .custom(referenceCodeIsUnique),

  body('initiatedBy', 'InitiatedBy is required and must be a valid user ID')
    .notEmpty()
    .isMongoId()
    .bail()
    .custom(existClient),

  body('description', 'Description must be a string of at most 200 characters')
    .optional()
    .isString()
    .isLength({ max: 200 }),

  body('status')
    .optional()
    .isIn(['pending', 'completed', 'failed'])
    .withMessage('Status must be one of: pending, completed, failed'),

  validateErrors
]

export const depositValidator = [
  body('amount', 'Amount is required and must be greater than 0')
    .notEmpty()
    .isFloat({ gt: 0 }),

  body('currency', 'Currency must be one of: USD, EUR, PEN')
    .notEmpty()
    .isIn(['USD', 'EUR', 'PEN']),

  body('account', 'Account is required and must be a valid client ID')
    .notEmpty()
    .isMongoId()
    .bail()
    .custom(existClient),

  body('method', 'Method is required and must be one of: cash, external_transfer, check')
    .notEmpty()
    .isIn(['cash', 'external_transfer', 'check']),

  body('referenceCode', 'Reference code is required and must be unique')
    .notEmpty()
    .isString()
    .bail()
    .custom(uniqueReferenceCodeDeposit),

  body('status')
    .optional()
    .isIn(['pending', 'completed', 'rejected']),

  body('initiatedBy')
    .optional()
    .isMongoId()
    .bail()
    .custom(existClient),

  validateErrors,
]


export const exchangeRateValidator = [
  body('fromCurrency', 'fromCurrency is required and must be 3 characters')
    .notEmpty()
    .isLength({ min: 3, max: 3 })
    .isString(),
  body('toCurrency', 'toCurrency is required and must be 3 characters')
    .notEmpty()
    .isLength({ min: 3, max: 3 })
    .isString(),
  body('rate', 'rate is required and must be a number greater or equal to 0')
    .notEmpty()
    .isFloat({ min: 0 }),
  validateErrors,
]

