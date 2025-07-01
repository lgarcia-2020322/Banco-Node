//Configurar el servidor express (HTTP)
'use strict'
import dotenv from 'dotenv';
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet' 
import cors from 'cors' 
import { limiter } from '../middlewares/rate.limit.js'
import movementRoutes from '../src/movement/movement.routes.js'
import purchaseRoutes from '../src/purchase/purchase.routes.js'
import reportRoutes from '../src/report/report.routes.js'

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
    app.use('/v1/movement', movementRoutes)
    app.use('/v1/purchase', purchaseRoutes) 
    app.use('/v1/report', reportRoutes)
}

export const initServer = async () => {
    const app = express();
    try {
        configs(app);
        routes(app);

        // Ejecutar antes de levantar el servidor
        // await createDefaultAdmin()

        app.listen(process.env.PORT);
        console.log(`Server running in port ${process.env.PORT}`);

    } catch (err) {
        console.error('Servidor init failed', err);
    }
}