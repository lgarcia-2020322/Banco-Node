//auth.controller.js
import User from '../user/user.model.js'
import { encrypt, checkPassword } from '../../utils/encrypt.js'
import { generateJwt } from '../../utils/jwt.js'
import Client from '../client/client.model.js'

// Registrar cliente (admin)
export const registerClient = async (req, res) => {
  try {
    const data = req.body

    if (data.monthlyIncome < 100)
      return res.status(400).send({ message: 'Monthly income must be at least Q100' })

    // Generar número de cuenta único
    let accountNumber
    do {
      accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString()
    } while (await Client.findOne({ accountNumber }))

    // Crear el usuario
    const newUser = new User({
      name: data.name,
      surname: data.surname,
      username: data.username,
      email: data.email,
      password: await encrypt(data.password),
      role: 'CLIENT'
    })

    const savedUser = await newUser.save()

    // Crear el cliente con referencia al usuario
    const newClient = new Client({
      user: savedUser._id,
      dpi: data.dpi,
      phone: data.phone,
      address: data.address,
      job: data.job,
      monthlyIncome: data.monthlyIncome,
      accountNumber
    })

    await newClient.save()

    return res.status(201).send({
      message: 'Client registered successfully',
      user: savedUser,
      client: newClient
    })
  } catch (err) {
    console.error(err)
    return res.status(500).send({ message: 'Register error', error: err })
  }
}


// Login cliente
export const loginClient = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user || user.role !== 'CLIENT')
      return res.status(404).send({ message: 'Client not found' })

    const match = await checkPassword(user.password, password)
    if (!match) return res.status(401).send({ message: 'Invalid password' })

    const token = await generateJwt({
      uid: user._id,
      name: user.name,
      role: user.role
    })

    return res.send({
      message: `Welcome ${user.name}`,
      user,
      token
    })
  } catch (err) {
    console.error(err)
    return res.status(500).send({ message: 'Login error', error: err })
  }
}

// Login administrador
export const loginAdmin = async (req, res) => {
  try {
    const { userLoggin, password } = req.body

    const admin = await User.findOne({
      $or: [
        { email: userLoggin },
        { username: userLoggin }
      ],
      role: 'ADMIN'
    })

    if (!admin)
      return res.status(404).send({ message: 'Admin not found' })

    const validPassword = await checkPassword(admin.password, password)
    if (!validPassword)
      return res.status(401).send({ message: 'Incorrect password' })

    const token = await generateJwt({
      uid: admin._id,
      name: admin.name,
      role: admin.role
    })

    return res.send({
      message: `Welcome ${admin.name}`,
      user: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      },
      token
    })
  } catch (err) {
    console.error(err)
    return res.status(500).send({ message: 'Login error', error: err })
  }
}

// Crear admin por defecto
export const createDefaultAdmin = async () => {
  try {
    const exists = await User.findOne({ role: 'ADMIN' })
    if (exists) return

    const admin = new User({
      name: 'Admin',
      surname: 'Banco',
      dpi: '1234567890123',
      username: 'ADMINB',
      email: 'admin@banco.com',
      password: await encrypt('ADMINb!123'),
      phone: '12345678',
      address: 'Ciudad',
      job: 'Administrador',
      monthlyIncome: 1000,
      accountNumber: '0000000001',
      role: 'ADMIN'
    })

    await admin.save()
    console.log('Default admin created')
  } catch (err) {
    console.error('Failed to create default admin:', err)
  }
}