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
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'http://pngimg.com/uploads/pokeball/pokeball_PNG12.png'
  }
})

module.exports = Pokemon
