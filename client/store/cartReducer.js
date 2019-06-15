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
export const getCartItems = (pokemon, order) => ({
  type: GET_CART,
  pokemon,
  order
})
export const removePokemon = (pokemonId, orderId) => ({
  type: REMOVE_POKEMON,
  pokemonId,
  orderId
})

//thunk
export const addToCartThunk = (pokemonId, userId) => {
  console.log('CART THUNK RUNNING')
  return async dispatch => {
    try {
      const pokemon = await axios.get(`/api/products/${pokemonId}`)
      let order = await axios.get(`/api/cart/${userId}`)
      const orderId = order.data[0].id
      // add pokemon to suborder model: create or update
      await axios.put(`/api/cart/`, {
        pokemonId,
        orderId,
        pokemon
      })
      order = await axios.get(`/api/cart/${userId}`)
      dispatch(addToCart(order.data[0].pokemons, orderId))
    } catch (err) {
      console.error(err)
    }
  }
}

export const getCartItemsThunk = userId => async dispatch => {
  console.log('GET CART BY USER ID: ', userId)
  try {
    dispatch(startLoading())
    const order = await axios.get(`/api/cart/${userId}`)
    const orderId = order.data[0].id
    const pokemon = order.data[0].pokemons
    // const {data} = await axios.get(`/api/cart/sub/${orderId}`)
    console.log('CART THUNK SUBORDER', order)
    dispatch(getCartItems(pokemon, orderId))
    dispatch(endLoading())
  } catch (err) {
    console.error(err)
  }
}

export const removePokemonThunk = (orderId, pokemonId) => async dispatch => {
  try {
    console.log(
      'STUFF IN THE REMOVE THUNK: ',
      'ORDER ID: ',
      orderId,
      'POKEMON ID: ',
      pokemonId
    )
    await axios.delete(`/api/cart/sub/${orderId}/${pokemonId}`, {
      params: {
        orderId: orderId,
        pokemonId: pokemonId
      }
    })
    const order = await axios.get(`api/cart/sub/${orderId}`)
    const pokemon = order.data[0].pokemons
    dispatch(removePokemon(pokemon, orderId))
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
      return {...state.pokemon, pokemon: action.pokemon, order: action.order}
    case REMOVE_POKEMON:
      return {
        ...state,
        pokemon: state.pokemon.filter(mon => mon.id !== action.pokemonId)
      }
    default:
      return state
  }
}
