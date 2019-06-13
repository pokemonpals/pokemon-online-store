const router = require('express').Router()
const Pokemon = require('../db/models/Pokemon')
const Order = require('../db/models/Order')
const SubOrder = require('../db/models/SubOrder')

module.exports = router

//get all items in the cart
router.get('/', async (req, res, next) => {
  try {
    const cart = await Order.findAll({})
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const pendingOrder = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
        pending: 'true'
      }
    })
    // console.log('THE PENDING ORDER', pendingOrder)
    res.json(pendingOrder)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const {dataValues} = await SubOrder.create({
      orderId: req.body.orderId,
      pokemonId: req.body.pokemonId,
      quantity: '1',
      cost: req.body.pokemon.price
    })
    console.log('SUBORDER RETURNED FROM CART PUR ROUTE: ', dataValues)
    res.json(dataValues)
  } catch (err) {
    next(err)
  }
})

// router.post('/', async (req, res, next) => {
//   try {
//     const order = await Order.create({

//     })
//   } catch (err) {
//     console.error(err)
//   }
// })
