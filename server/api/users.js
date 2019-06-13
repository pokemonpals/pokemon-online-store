const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {firstName, lastName, email, password} = req.body
    console.log(firstName, lastName, email, password)
    const data = await User.create({
      firstName,
      lastName,
      email,
      password
    })
    res.json(data)
  } catch (err) {
    console.error(err)
  }
})
