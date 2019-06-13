const router = require('express').Router()
const Pokemon = require('../db/models/Pokemon')
const Order = require('../db/models/Order')
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
    const singleUserOrder = await Order.findById({
      where: {
        pending: true
      }
    })
    res.json(singleUserOrder)
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
