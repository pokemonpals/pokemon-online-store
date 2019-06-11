const router = require('express').Router()

//users router
router.use('/users', require('./users'))
//pokemons router
router.use('/products', require('./pokemons'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
