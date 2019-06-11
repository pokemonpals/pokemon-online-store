const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  totalPrice: {
    type: Sequelize.DECIMAL,
    validate: {
      min: 0.0
    }
  }
})

module.exports = Order
