import express, { urlencoded } from "express"
import cors from "cors"

import authRoutes from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"


const app = express()

//middlewares
app.use(cors())

app.use(cookieParser())

app.use(express.json({limit:"100kb"}))

app.use(urlencoded({ extended: true, limit:"100kb" }))

//Routes

app.use("/api/user/auth",authRoutes)

export { app }