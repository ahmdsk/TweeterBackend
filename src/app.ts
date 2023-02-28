import express, { Request, Response } from "express"
import bodyParser from "body-parser"
import router from "./routes/router"
import mongoose from "mongoose"
import cors from "cors"

const app = express()
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Routing
app.use(router)

mongoose.set('strictQuery', true)
mongoose.connect("mongodb://localhost:27017/tweeter", () => {
  console.log("Database connected")
});

app.listen(3001, () => {
    console.log('App run in http://localhost:3001')
})