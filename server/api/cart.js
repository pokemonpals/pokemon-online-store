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
  const orderId = req.body.orderId
  const pokemonId = req.body.pokemonId
  const price = req.body.pokemon.data[0].price
  const exist = await SubOrder.findOne({
    where: {orderId: orderId, pokemonId: pokemonId}
  })
  if (!exist) {
    try {
      const {dataValues} = await SubOrder.create({
        orderId: orderId,
        pokemonId: pokemonId,
        quantity: '1',
        price: price
      })
      console.log('SUBORDER RETURNED FROM CART PUR ROUTE: ', dataValues)
      res.json(dataValues)
    } catch (err) {
      next(err)
    }
  } else {
    await exist.increment(['quantity'], {by: 1})
    console.log('THE ELSE')
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
