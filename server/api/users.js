const router = require('express').Router()
const {User, Order} = require('../db/models')
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

router.get('/:userId', async (req, res, next) => {
  try {
    const singleUser = await User.findAll({
      include: [
        {
          model: Order
        }
      ],
      where: {
        id: req.params.userId
      }
    })
    if (singleUser) res.status(200).send(singleUser)
    else res.sendStatus(404)
  } catch (error) {
    next(error)
  }
})

router.put('/:userId', (req, res, next) => {
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
  User.findByPk(req.params.userId)
    .then(user => {
      user
        .update({
          email,
          password,
          firstName,
          lastName,
          address,
          city,
          state,
          zipcode
        })
        .then(async () =>
          res.json(
            await User.findOne({
              include: [
                {
                  model: Order,
                  as: 'order'
                }
              ],
              where: {
                id: req.params.userId
              }
            })
          )
        )
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
