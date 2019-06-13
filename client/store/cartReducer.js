import axios from 'axios'
import {startLoading, endLoading} from './loadingReducer'

//initial state
const initialState = {
  pokemon: [],
  order: 0
}

//action type
const ADD_TO_CART = 'ADD_TO_CART'
const GET_CART = 'GET_CART'
const REMOVE_ITEM = 'REMOVE_ITEM'

//action creator
export const addToCart = (pokemon, user) => ({
  type: ADD_TO_CART,
  pokemon,
  user
})
export const getCartItems = items => ({
  type: GET_CART,
  items
})
export const removeItem = () => ({
  type: REMOVE_ITEM
})

//thunk
export const addToCartThunk = (pokemonId, userId) => {
  console.log('CART THUNK RUNNING')
  return async dispatch => {
    try {
      const pokemon = await axios.get(`/api/products/${pokemonId}`)
      dispatch(addToCart(pokemon.data))
    } catch (err) {
      console.error(err)
    }
    try {
      const order = await axios.get(`/api/orders/${userId}`)
      dispatch(addToCart(order.data.id))
    } catch (err) {
      console.error(err)
    }
  }
}

export const getCartItemsThunk = orderId => async dispatch => {
  try {
    dispatch(startLoading())
    const {data} = await axios.get(`/api/cart/${orderId}`)
    dispatch(getCartItems(data))
    dispatch(endLoading())
  } catch (err) {
    console.error(err)
  }
}

// export const removeItemThunk = () => async dispatch => {
//   try {
//   } catch (err) {
//     console.error(err)
//   }
// }
//reducer
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      console.log('CART REDUCER RUNNING')
      return [...state, action.pokemon[0]]
    case GET_CART:
      return state.pokemon
    default:
      return state
  }
}
