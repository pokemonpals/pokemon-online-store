const Sequelize = require('sequelize')
const db = require('../db')

const Pokemon = db.define('pokemon', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.DECIMAL,
    validate: {
      min: 0.0,
      isDecimal: true
    }
  },
  imageURL: {
    type: Sequelize.STRING
  }
})

module.exports = Pokemon
