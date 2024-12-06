const dotenv = require('dotenv').config()
const brand_repo = require('../repositories/brand.repository.js')

module.exports = {
  brand_dash: async (req, res) => {
    try {
      const data = await brand_repo.brand_dash(req.body)

      res.status(200).json({
        success: true,
        data,
        message: 'Brand Details Retrieved Successfully!',
      })
    } catch (err) {
      res.status(400).json({
        success: false,
        err,
        message: err.message,
      })
    }
  },
}
