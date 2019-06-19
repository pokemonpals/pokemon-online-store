const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    validate: {
      notEmpty: true
    },
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  },
  firstName: {
    type: Sequelize.STRING,
    validate: {
      isAlpha: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    validate: {
      isAlpha: true
    }
  },
  address: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING,
    validate: {
      isAlpha: true
    }
  },
  state: {
    type: Sequelize.STRING,
    validate: {
      len: [2]
    }
  },
  zipcode: {
    type: Sequelize.STRING,
    validate: {
      len: [5]
    }
  },
  admin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  cardName: {
    type: Sequelize.STRING
  },
  cardNumber: {
    type: Sequelize.STRING,
    validate: {
      isCreditCard: true
    }
  },
  expDate: {
    type: Sequelize.STRING
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})
