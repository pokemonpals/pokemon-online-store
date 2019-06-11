const router = require('express').Router()
const {Pokemon} = require('../db/models')
module.exports = router

//get all pokemons
router.get('/', async (req, res, next) => {
  try {
    const pokemons = await Pokemon.findAll({})
    res.json(pokemons)
  } catch (err) {
    next(err)
  }
})

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
