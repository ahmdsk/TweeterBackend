import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import router from "./routes/router"

dotenv.config()

const app = express()
const port = process.env.PORT || 3001
app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Static File
app.use('/uploads', express.static('uploads'))

// Routing
app.use(router)

mongoose.set('strictQuery', true)
mongoose.connect("mongodb://localhost:27017/tweeter", () => {
  console.log("Database connected")
});

app.listen(port, () => {
    console.log(`App run in http://localhost:${port}`)
})