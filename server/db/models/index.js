const User = require('./user')
const Pokemon = require('./Pokemon')
const Inventory = require('./Inventory')
const SubOrder = require('./SubOrder')
const Order = require('./Order')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Pokemon.hasMany(Inventory)
// Inventory.hasMany(Pokemon)
User.hasMany(Order)

//Creating new many-to-many associations between Orders and Pokemons for SubOrder through table
// Order.hasMany(SubOrder)
// Pokemon.hasMany(SubOrder)
Order.belongsToMany(Pokemon, {through: SubOrder})
Pokemon.belongsToMany(Order, {through: SubOrder})

Order.belongsTo(User)

Inventory.belongsTo(Pokemon)
// Pokemon.belongsTo(Inventory, { as: 'pokemonId' })
// SubOrder.belongsTo(Pokemon)

module.exports = {
  User,
  Pokemon,
  Order,
  SubOrder,
  Inventory
}
