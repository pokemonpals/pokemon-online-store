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

// IS THIS BEING USED?
router.get('/sub/:orderId', async (req, res, next) => {
  const orderId = req.params.orderId
  try {
    const order = await Order.findOne({
      where: {id: orderId},
      include: [{model: Pokemon}]
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.delete('/sub/:orderId/:pokemonId', async (req, res, next) => {
  const orderId = req.params.orderId
  const pokemonId = req.params.pokemonId
  try {
    const pokemonDelete = await SubOrder.findOne({
      where: {
        orderId: orderId,
        pokemonId: pokemonId
      }
    })
    await pokemonDelete.destroy()
    const order = await Order.findOne({where: {id: orderId}, include: Pokemon})
    res.json(order).status(204)
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId/checkout', async (req, res, next) => {
  const order = await Order.findByPk(req.params.orderId)
  res.json(order)
})

router.put('/:orderId/checkout', async (req, res, next) => {
  await Order.update(
    {
      pending: false
    },
    {
      where: {
        id: req.params.orderId
        // returning: true,
        // plain: true
      }
    }
  )
  res.status(204).send('ORDER COMPLETED SUCCESSFULLY!')
})

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
