const express = require('express')
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const connectDB = require('./config/db.config')
const cors = require('cors')

const fruitRouter = require('./routes/fruits.route')
const brandRouter = require('./routes/brands.route')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())

connectDB()

app.use(fruitRouter)
app.use(brandRouter)

app.listen(PORT, () => {
  console.log(`Server Running on Port: ${PORT}`)
})
