//Configurar el servidor express (HTTP)
'use strict'
import dotenv from 'dotenv';
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet' 
import cors from 'cors' 
import { limiter } from '../middlewares/rate.limit.js'
import depositRoutes from '../src/deposit/deposit.routes.js'
import transferRoutes from '../src/transfer/transfer.routes.js'
import exchangeRoutes from '../src/currency/currency.routes.js'
import authRoutes from '../src/auth/auth.routes.js'
import clientRoutes from '../src/client/client.routes.js'
import userRoutes from '../src/user/user.routes.js'
import movementRoutes from '../src/movement/movement.routes.js'
import purchaseRoutes from '../src/purchase/purchase.routes.js'
import productRoutes from '../src/product/product.routes.js'
//import favoriteRoutes from '../src/favorite/favorite.routes.js'
import { createDefaultAdmin } from '../src/auth/auth.controller.js'

dotenv.config();
const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(helmet())
    app.use(limiter)
    app.use(morgan('dev'))
    
}

const routes = (app)=>{
    app.use('/v1/deposit', depositRoutes)
    app.use('/v1/exchangeRate', exchangeRoutes)
    app.use('/v1/transfer', transferRoutes)
    app.use('/v1/auth', authRoutes)
    app.use('/v1/client', clientRoutes)
    app.use('/v1/users', userRoutes)
    app.use('/v1/movement', movementRoutes)
    app.use('/v1/purchase', purchaseRoutes) 
    app.use('/v1/product', productRoutes)
    //app.use('/v1/favorite', favoriteRoutes)
}

export const initServer = async () => {
    const app = express();
    try {
        configs(app);
        routes(app);

        // Ejecutar antes de levantar el servidor
        await createDefaultAdmin()

        app.listen(process.env.PORT);
        console.log(`Server running in port ${process.env.PORT}`);

    } catch (err) {
        console.error('Servidor init failed', err);
    }
}