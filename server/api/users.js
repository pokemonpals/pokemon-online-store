const router = require('express').Router()
const {User, Order} = require('../db/models')
module.exports = router

router.get('/', isAdmin, async (req, res, next) => {
  try {
    console.log('REQ USER!!!!', req.user)
    console.log('ADMIN STATUS: ', req.user.admin)
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

router.get('/:userId', isUser, async (req, res, next) => {
  try {
    console.log('REQ PARAMS ID', req.params.userId)
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

function isAdmin(req, res, next) {
  if (req.user && req.user.admin) {
    //display all users and their emails
    return next()
  }
  // if (req.user && !req.user.admin) {
  //   res.redirect(`/api/users/${req.user.id}`)
  // }
  //redirect to home if admin status is falsey
  res.redirect('/')
}

function isUser(req, res, next) {
  //if logged in and you are the appropriate user OR are an admin
  if (
    (req.user && req.user.id === +req.params.userId) ||
    (req.user && req.user.admin)
  ) {
    return next()
  }
  //redirect to home if not the appropriate user, not an admin or not logged in
  res.redirect('/')
}
