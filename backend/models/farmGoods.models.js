const mongoose = require('mongoose')

const farmGoods = new mongoose.Schema({
  produce_name: {
    type: String,
    required: true,
  },
  freshness: {
    type: Number,
    required: true,
  },
  expected_life: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('farm_goods', farmGoods)
