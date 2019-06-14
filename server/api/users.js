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

router.post('/', (req, res, next) => {
  const {firstName, lastName, email, password} = req.body
  User.create({
    firstName,
    lastName,
    email,
    password
  })
    .then(user => res.json(user))
    .catch(next)
})

function isAdmin(req, res) {
  if (req.user.admin) {
    //display all users and their emails
  }
  //if user is logged in, display their email
  //if user isn't logged in, don't display anything
}
