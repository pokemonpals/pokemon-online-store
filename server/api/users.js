const router = require('express').Router()
const {User, Order} = require('../db/models')
module.exports = router

router.get('/', isAdmin, async (req, res, next) => {
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

router.put('/:userId', async (req, res, next) => {
  try {
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
    const {data} = await User.update(
      {
        email,
        password,
        firstName,
        lastName,
        address,
        city,
        state,
        zipcode
      },
      {
        where: {id: req.params.userId}
      }
    )
    res.send(data)
  } catch (err) {
    next(err)
  }
})

function isAdmin(req, res, next) {
  if (req.user && req.user.admin) {
    //if you are an admin, show route
    return next()
  }
  //redirect to home if you are not an admin
  res.redirect('/')
}

function isUser(req, res, next) {
  //if logged in and you are the appropriate user OR are an admin, show route
  if (
    (req.user && req.user.id === +req.params.userId) ||
    (req.user && req.user.admin)
  ) {
    return next()
  }
  //redirect to home if not the appropriate user, not an admin or not logged in
  res.redirect('/')
}
