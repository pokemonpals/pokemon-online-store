/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Pokemon = db.model('pokemon')

describe('Pokemon model', () => {
  describe('Validations', () => {
    it('requires `name`', async () => {
      const pokemon = Pokemon.build()

      try {
        await pokemon.validate()
        throw Error(
          'validation was successful but should have failed without `name`'
        )
      } catch (err) {
        expect(err.message).to.contain('name cannot be null')
      }
    })

    it('requires `name` to not be an empty string', async () => {
      const pokemon = Pokemon.build({
        name: ''
      })

      try {
        await pokemon.validate()
        throw Error(
          'validation was successful but should have failed if name is an empty string'
        )
      } catch (err) {
        expect(err.message).to.contain('Validation error')
        /* handle error */
      }
    })
  })
})
