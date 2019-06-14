const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    console.log('SESSION!!!', req.user)

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

router.put(`/api/users`, (req, res, next) => {
  const {
    email,
    password,
    firstName,
    lastName,
    address,
    city,
    state,
    zipcode
  } = req.body
  res
    .json(
      User.update({
        email,
        password,
        firstName,
        lastName,
        address,
        city,
        state,
        zipcode
      })
    )
    .catch(next)
})

function isAdmin(req, res) {
  if (req.user.admin) {
    //display all users and their emails
  }
  //if user is logged in, display their email
  //if user isn't logged in, don't display anything
}
