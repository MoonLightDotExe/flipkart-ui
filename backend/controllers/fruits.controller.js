const dotenv = require('dotenv').config()
const fruit_repo = require('../repositories/fruit.repository.js')

module.exports = {
  fruit_dash: async (req, res) => {
    try {
      const data = await fruit_repo.fruit_dash(req.body)

      res.status(200).json({
        success: true,
        data,
        message: 'Fruits data retrieved successfully!',
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
