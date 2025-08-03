import express, { urlencoded } from "express"
import cors from "cors"

import cookieParser from "cookie-parser"


const app = express()

//middlewares
app.use(cors())

app.use(cookieParser())

app.use(express.json({limit:"100kb"}))

app.use(urlencoded({ extended: true, limit:"100kb" }))

//Importing Routes

import authRoutes from "./routes/auth.routes.js"
import movieRoutes from "./routes/movie.routes.js"
import tvShowRoutes from "./routes/tvShow.routes.js"
import searchRoutes from "./routes/search.routes.js"

import verifyJWT from "./middlewares/auth.middlewares.js"

//Routes

app.use("/api/user/auth",authRoutes)
app.use("/api/user/movie",verifyJWT, movieRoutes)
app.use("/api/user/tvshow",verifyJWT ,tvShowRoutes)
app.use("/api/user/search",verifyJWT ,searchRoutes)


export { app }