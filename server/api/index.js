const router = require('express').Router()

//users router
router.use('/users', require('./users'))
//pokemons router
router.use('/products', require('./pokemons'))
//cart router
router.use('/cart', require('./cart'))
//checkout router
// router.use('/checkout', require('./checkout'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
