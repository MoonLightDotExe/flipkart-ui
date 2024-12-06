const farm_goods = require('../models/farmGoods.models')

const dotenv = require('dotenv').config()

const self = (module.exports = {
  compute_dash: (body) => {
    return new Promise(async (resolve, reject) => {
      try {
        let goods = await farm_goods.find({})
        goods.map()
      } catch (err) {}
    })
  },
  fruit_dash: (body) => {
    return new Promise(async (resolve, reject) => {
      try {
        let expired_goods = await farm_goods.find({ freshness: { $lt: 5 } })
        let fresh_goods = await farm_goods.find({ freshness: { $gt: 5 } })
        resolve({
          expired_goods,
          fresh_goods,
        })
      } catch (err) {
        reject(err)
      }
    })
  },
})
