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
const REMOVE_POKEMON = 'REMOVE_POKEMON'

//action creator
export const addToCart = (pokemon, order) => ({
  type: ADD_TO_CART,
  pokemon,
  order
})
export const getCartItems = items => ({
  type: GET_CART,
  items
})
export const removePokemon = pokemonId => ({
  type: REMOVE_POKEMON,
  pokemonId
})

//thunk
export const addToCartThunk = (pokemonId, userId) => {
  console.log('CART THUNK RUNNING')
  return async dispatch => {
    try {
      const pokemon = await axios.get(`/api/products/${pokemonId}`)

      const order = await axios.get(`/api/cart/${userId}`)
      const orderId = order.data[0].id
      console.log('CART THUNK 1')
      const subOrder = await axios.put(`/api/cart/`, {
        pokemonId,
        orderId,
        pokemon
      })
      console.log('HERE?')
      const cartData = await axios.get(`/api/cart/sub/${orderId}`)

      console.log('CART THUNK SUBORDER', cartData)

      dispatch(addToCart(cartData, orderId))
    } catch (err) {
      console.error(err)
    }
  }
}

export const getCartItemsThunk = orderId => async dispatch => {
  try {
    dispatch(startLoading())
    const {data} = await axios.get(`/api/cart/sub/${orderId}`)
    dispatch(getCartItems(data))
    dispatch(endLoading())
  } catch (err) {
    console.error(err)
  }
}

export const removePokemonThunk = (pokemonId, orderId) => async dispatch => {
  try {
    const {data} = await axios.delete(`/api/cart/sub/${orderId}/`)
    //pokemonID === pokemonId passed in value on button
    dispatch(removePokemon(pokemonId))
  } catch (err) {
    console.error(err)
  }
}

//reducer
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {...state, pokemon: action.pokemon, order: action.order}
    case GET_CART:
      return state.pokemon
    case REMOVE_POKEMON:
      return {pokemon: state.pokemon.filter(mon => mon.id !== action.pokemonId)}
    default:
      return state
  }
}
