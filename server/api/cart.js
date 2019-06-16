const router = require('express').Router()
const {Pokemon, Order, SubOrder} = require('../db/models/index')
// const Pokemon = require('../db/models/Pokemon')
// const Order = require('../db/models/Order')
// const SubOrder = require('../db/models/SubOrder')

module.exports = router

//get all items in the cart
router.get('/', isAdmin, async (req, res, next) => {
  try {
    const cart = await Order.findAll({})
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', isUser, async (req, res, next) => {
  try {
    const pendingOrder = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
        pending: 'true'
      },
      include: [{model: Pokemon}]
    })
    // console.log('THE PENDING ORDER', pendingOrder)
    res.json(pendingOrder)
  } catch (err) {
    next(err)
  }
})

// Create New or Update Existing Suborder
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
      // console.log('SUBORDER RETURNED FROM CART PUT ROUTE: ', dataValues)
      res.json(dataValues)
    } catch (err) {
      next(err)
    }
  } else {
    try {
      await exist.increment(['quantity'], {by: 1})
      res.send()
    } catch (err) {
      next(err)
    }
  }
})

// CAN DELETE/REUSE THIS< UNNECESSARY< INCLUDED THIS FUNCTIONALITY IN BY :USERID ROUTE
// WAS ORIGINALLY FOR CART COMPONENET, CAN BE USED FOR PAST ORDER VIEWS
router.get('/sub/:orderId', async (req, res, next) => {
  const orderId = req.params.orderId
  try {
    const subOrders = await Order.findOne({
      where: {id: orderId},
      include: [{model: Pokemon}]
    })
    console.log('GET SUBORDERS BY ID ROUTE: ', subOrders)
    res.json(subOrders)
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

function isAdmin(req, res, next) {
  //if you are an admin, show route
  if (req.user && req.user.admin) {
    return next()
  }
  //redirect to home if you are not an admin
  res.redirect('/')
}

function isUser(req, res, next) {
  //if logged in and you are the appropriate user OR are an admin, show route
  if (
    (req.user && req.user.id === +req.params.userId) ||
    (req.user && req.user.admin)
  ) {
    return next()
  }
  //redirect to home if not the appropriate user, not an admin or not logged in
  res.redirect('/')
}
