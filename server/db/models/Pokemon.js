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
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://cdn.bulbagarden.net/upload/7/77/201Unown.png'
  }
})

module.exports = Pokemon
