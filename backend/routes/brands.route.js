const express = require('express')
const brandController = require('../controllers/brands.controller')

const brandRouter = express.Router()

brandRouter.get('/routes/brand_dash', brandController.brand_dash)

module.exports = brandRouter
