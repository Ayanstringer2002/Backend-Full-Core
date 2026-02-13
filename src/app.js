import express from "express"
import cors from "cors0"
import cookieParser from "cookie-parser"
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"})) // It allows sending nested objects in form data.
app.use(express.static("public"))
app.use(cookieParser())




export {app}
 