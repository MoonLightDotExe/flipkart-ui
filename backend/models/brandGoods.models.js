const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema({
  Timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
  Brand: {
    type: String,
    required: true,
    trim: true,
  },
  Expiry_date: {
    type: String,
    required: true,
    trim: true,
  },
  Count: {
    type: Number,
    required: true,
    min: 0,
  },
  Expired: {
    type: String,
    required: true,
    enum: ['Yes', 'NA'],
    default: 'NA',
  },
  Expected_life_span_days: {
    type: Number,
    min: 0,
    default: null,
  },
})

module.exports = mongoose.model('brand_goods', brandSchema)
