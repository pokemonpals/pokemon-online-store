'use strict'

const db = require('../server/db')
const {User, Pokemon, Inventory} = require('../server/db/models')

const allPokemon = [
  {
    name: 'Pikachu',
    type: 'Electric',
    description:
      'Known for its electrifying personality and lightning-quick speed, Pikachu will be sure to keep you on your toes. Do not be fooled by its cute appearance or you will be shocked by its cunning intelligence.',
    price: 1500.0,
    imageUrl: 'https://cdn.bulbagarden.net/upload/b/b8/025Pikachu_LG.png'
  },
  {
    name: 'Charmander',
    type: 'Fire',
    description:
      'With its ability to light fire, Charmander is a a great pal to consider for lovers of the outdoors. It will light your campfire, warm your heart, and set your world aflame with its unwavering loyalty.',
    price: 1500.0,
    imageUrl: 'https://cdn.bulbagarden.net/upload/7/73/004Charmander.png'
  },
  {
    name: 'Squirtle',
    type: 'Water',
    description:
      'As one of the more playful Pokemon, Squirtle will be overflowing with ideas on how to keep you entertained with its refresheningly cool personality.',
    price: 1500.0,
    imageUrl: 'https://cdn.bulbagarden.net/upload/3/39/007Squirtle.png'
  },
  {
    name: 'Bulbasaur',
    type: 'Grass',
    description:
      'With a gentle and calm demeanor, Bulbasaur is perfect for those looking for a low-maintenance pal.',
    //mature, wrap, calm, grow
    price: 1500.0,
    imageUrl: 'https://cdn.bulbagarden.net/upload/2/21/001Bulbasaur.png'
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'jen@email.com', password: '125'}),
    User.create({email: 'daniel@admin.com', password: '776', admin: true})
  ])

  const pokemons = await Promise.all(
    allPokemon.map(pokemon => {
      return Pokemon.create(pokemon)
    })
  )

  // const inventories = await Promise.all(allPokemon.map(pokemon => {
  //   return Inventory.create({
  //     quantity: 100,
  //     pokemonId: 1
  //   })
  // }))
  const inventory = await Promise.all([
    Inventory.create({
      quantity: 100,
      pokemonId: 1
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
