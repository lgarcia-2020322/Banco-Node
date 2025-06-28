// validaciones de modelos
import { body } from 'express-validator'
import { validateErrors } from './validate.error.js'
import { existClient,uniqueReferenceCodeDeposit, referenceCodeIsUnique, existDPI, existUsername, existEmail } from './db.validators.js'


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

// Validación de registro de cliente
export const registerClientValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('surname').notEmpty().withMessage('Surname is required'),
  body('username')
    .notEmpty().withMessage('Username is required')
    .toLowerCase()
    .custom(existUsername),
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Must be a valid email')
    .custom(existEmail),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .isStrongPassword(),
  body('dpi')
    .notEmpty().withMessage('DPI is required')
    .isLength({ min: 13, max: 13 }).withMessage('DPI must be 13 digits')
    .isNumeric().withMessage('DPI must contain only numbers')
    .custom(existDPI),
  body('phone')
    .notEmpty().withMessage('Phone is required')
    .isLength({ min: 8, max: 13 }),
  body('address').notEmpty().withMessage('Address is required'),
  body('job').notEmpty().withMessage('Job is required'),
  body('monthlyIncome')
    .notEmpty().withMessage('Monthly income is required')
    .isFloat({ min: 100 }).withMessage('Monthly income must be at least Q100'),
  validateErrors
]

// Validación para actualizar cliente
export const updateClientValidator = [
  body('address').optional().isLength({ max: 100 }),
  body('job').optional().isLength({ max: 50 }),
  body('monthlyIncome').optional().isFloat({ min: 100 }),
  validateErrors
]

// Validación login admin
export const loginValidator = [
  body('userLoggin', 'Username or email is required').notEmpty(),
  body('password', 'Password must be at least 8 characters')
    .notEmpty().isLength({ min: 8 }),
  validateErrors
]

// Validación login cliente
export const loginClientValidator = [
  body('email', 'Email is required').notEmpty().isEmail(),
  body('password', 'Password must be at least 8 characters')
    .notEmpty().isLength({ min: 8 }),
  validateErrors
]

export const updateUserValidator = [
  body('name')
    .optional()
    .isLength({ max: 25 })
    .withMessage('Name must be at most 25 characters'),

  body('surname')
    .optional()
    .isLength({ max: 25 })
    .withMessage('Surname must be at most 25 characters'),

  body('username')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Username must be at most 50 characters'),

  body('email')
    .optional()
    .isEmail()
    .withMessage('Must be a valid email'),

  validateErrors
]