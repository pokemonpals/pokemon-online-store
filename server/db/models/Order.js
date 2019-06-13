const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  pending: {
    type: Sequelize.STRING,
    defaultValue: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0.0
    }
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Date.now()
  }
})

module.exports = Order
