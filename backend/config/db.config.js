const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const options = {
  dbName: 'Grid_DB',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  serverSelectionTimeoutMS: 5000,
}

const connectDB = async (req, res) => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, options)
    console.log(`DB Connected on host: ${conn.connection.host}`)
  } catch (err) {
    console.log(err)
  }
}

module.exports = connectDB
