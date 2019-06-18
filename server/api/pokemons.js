const router = require('express').Router()
const Pokemon = require('../db/models/Pokemon')
module.exports = router

//get single pokemon
router.get('/:pokemonId', async (req, res, next) => {
  try {
    const singlePokemon = await Pokemon.findAll({
      where: {
        id: req.params.pokemonId
      }
    })

    if (singlePokemon.length > 0) {
      res.status(200).send(singlePokemon)
    } else {
      let error = new Error('Pokemon does not exist')
      error.httpStatusCode = 404
      throw error
    }
  } catch (error) {
    next(error)
  }
})

//get all pokemons
router.get('/', async (req, res, next) => {
  try {
    const pokemons = await Pokemon.findAll({})
    res.json(pokemons)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newPokemon = await Pokemon.create({
      name: req.body.name,
      type: req.body.type,
      description: req.body.description,
      price: req.body.price,
      imageUrl: req.body.imageUrl
    })
    res.json(newPokemon)
  } catch (err) {
    next(err)
  }
})

function isAdmin(req, res, next) {
  //if you are an admin, show route
  if (req.user && req.user.admin) {
    return next()
  }
  //redirect to home if you are not an admin
  res.redirect('/')
}
