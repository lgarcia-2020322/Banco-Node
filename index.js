//Ejecución del proyecto
import { initServer } from "./configs/app.js"
import { config } from "dotenv" //Decirle a Node que se usa DOTENV
import { connect } from "./configs/mongo.js"
import { createDefaultAdmin } from "./src/auth/auth.controller.js"

config()
initServer()
connect()
createDefaultAdmin()