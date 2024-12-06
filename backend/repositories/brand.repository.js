const brand_goods = require('../models/brandGoods.models')

const dotenv = require('dotenv').config()

const self = (module.exports = {
  brand_dash: (body) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await brand_goods.find({})
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  },
})
