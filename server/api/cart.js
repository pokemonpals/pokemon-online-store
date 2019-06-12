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
