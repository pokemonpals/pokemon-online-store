const router = require('express').Router()
const Cart = require('../db/models/Pokemon')
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

router.get('/:orderId', async (req, res, next) => {
  const orderId = req.params.orderId
  try {
    // const cart = await Order.findAll({where: {id: orderId}, include: })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})
