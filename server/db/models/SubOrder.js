const Sequelize = require('sequelize')
const db = require('../db')

const SubOrder = db.define('suborder', {
  quantityPurchased: {
    type: Sequelize.INTEGER
  }
})

module.exports = SubOrder
