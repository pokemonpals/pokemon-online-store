const Sequelize = require('sequelize')
const db = require('../db')

const SubOrder = db.define('suborder', {
  quantity: Sequelize.INTEGER,
  price: Sequelize.INTEGER
})

module.exports = SubOrder
