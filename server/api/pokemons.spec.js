const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Pokemon = db.model('pokemon')

describe('Product routes', () => {
  let storedProducts

  const productData = [
    {
      name: 'Geodude',
      type: 'Rock'
    },
    {
      name: 'JigglyPuff',
      type: 'Normal'
    }
  ]

  beforeEach(() => {
    return db.sync({force: true})
  })

  describe(`/api/products`, () => {
    beforeEach(async () => {
      const createdProducts = await Pokemon.bulkCreate(productData)
      storedProducts = createdProducts.map(product => product.dataValues)
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.have.length(2)
      expect(res.body[0].name).to.equal(storedProducts[0].name)
    })
  })

  describe('/api/products/:pokemonId', () => {
    beforeEach(async () => {
      const createdProducts = await Pokemon.bulkCreate(productData)
      storedProducts = createdProducts.map(product => product.dataValues)
    })

    it('GET /api/products/:pokemonId', async () => {
      const res = await request(app)
        .get('/api/products/2')
        .expect(200)

      expect(res.body[0].name).to.equal(storedProducts[1].name)
    })
  })
})
