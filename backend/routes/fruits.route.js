const express = require('express')
const fruitController = require('../controllers/fruits.controller')

const fruitRouter = express.Router()

fruitRouter.get('/routes/fruit_dash', fruitController.fruit_dash)

module.exports = fruitRouter
