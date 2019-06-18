const router = require('express').Router()
const Order = require('../db/models/index/Order')

router.put('/:orderId', async (req, res, next) => {
  const [numOfAffectedOrders, affectedOrders] = Order.update(
    {
      pending: false
    },
    {
      where: {
        id: req.params.orderId,
        returning: true,
        plain: true
      }
    }
  )
})
