import axios from 'axios'
import history from '../history'
import {startLoading, endLoading} from './loadingReducer'

/**
 * ACTION TYPES
 */
const GET_ALL_USERS = 'GET_ALL_USERS'
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const ADD_USER = 'ADD_USER'
const UPDATE_USER = 'UPDATE_USER'
const GET_USER_ORDERS = 'GET_USER_ORDERS'
/**
 * INITIAL STATE-->combinedReducer
 */

/**
 * ACTION CREATORS
 */

const gotAllUsers = users => ({type: GET_ALL_USERS, users})
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const addUser = user => ({type: ADD_USER, user})
const updateUser = updatedUser => ({
  type: UPDATE_USER,
  updatedUser
})
const getUserOrders = orders => ({type: GET_USER_ORDERS, orders})
/**
 * THUNK CREATORS
 */

export const updateUserThunk = (userId, updatedUser) => async dispatch => {
  try {
    dispatch(startLoading())
    const {data} = await axios.put(`/api/users/${userId}`, updatedUser)
    dispatch(updateUser(data))
    dispatch(endLoading())
  } catch (err) {
    console.log(err)
  }
}

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const signupThunk = input => async dispatch => {
  const {data} = await axios.post(`/api/users`, input)
  dispatch(addUser(data))
  history.push('/me')
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/me')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const getAllUsers = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(gotAllUsers(data))
    } catch (err) {
      console.error(err)
    }
  }
}

// export const getUserOrdersThunk = () => {
//   return async dispatch => {
//     try {
//       const {data} = await axios.get(`/api/users/orders`)
//       dispatch(getUserOrders(data))
//     } catch (err) {
//       console.error(err)
//     }
//   }
// }
export const getUserOrdersThunk = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${userId}/orders`)
      dispatch(getUserOrders(data))
    } catch (err) {
      console.error(err)
    }
  }
}
/**
 * REDUCER
 */
export default function(state = [], action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.users
    case GET_USER:
      return action.user
    case REMOVE_USER:
      state = []
      return state
    case ADD_USER:
      return action.user
    case UPDATE_USER:
      return state
    case GET_USER_ORDERS:
      return {...state, orders: action.orders}
    default:
      return state
  }
}
