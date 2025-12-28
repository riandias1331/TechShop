import dotenv from "dotenv"
import express, { Express } from "express"
import mongoose from "mongoose"
import pool from './config/db'
import createUserTable from './data/createUserTable'
import routes from "./routes/routes"
import cors from "cors"
import errorHandler from './middlewares/errorHandler'
import path from "path"
import axios from "axios"

// Config
dotenv.config()
const app: Express = express()
// const port: string | number = process.env.PORT || 8080
const port = process.env.PORT ? Number(process.env.PORT) : 8080;

// Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
    // origin: 'http://localhost:5173',
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// Servir arquivos estáticos (opcional, para success.html ou frontend build)
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.use(routes)



// Error Handler
app.use(errorHandler)

// DataBase Mongodb
mongoose.connect(process.env.MONGO_URL as string)
    .then(() => {
        console.log("DataBase is connected")
        app.emit("DataBase")
    })
    .catch((error) => {
        console.log(error)
    })

// Databse Postgres
createUserTable()
app.get('/test-error-pg', async(req, res) => {
    const result = await pool.query("SELECT current_database()")
    res.send(`The database name is : ${result.rows[0].current_database}`)
})

// Server
app.on("DataBase", () => {
    app.listen(port, () => {
        console.log(`Server is running in localhost:${port}`)
    })
})