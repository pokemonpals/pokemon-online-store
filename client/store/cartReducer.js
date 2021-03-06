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
const GET_USER_ORDERS = 'GET_USER_ORDERS'

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
export const removePokemon = (pokemonId, userId) => ({
  type: REMOVE_POKEMON,
  pokemonId,
  userId
})

// export const getUserOrders = userId => ({
//   type: GET_USER_ORDERS,
//   userId
// })
// export const completePurchase = orderId => ({
//   type: COMPLETE_PURCHASE,
//   orderId
// })

//thunk
export const addToCartThunk = (pokemonId, userId) => {
  return async dispatch => {
    try {
      const pokemon = await axios.get(`/api/products/${pokemonId}`)
      //remove user ID?

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

export const updateCartItemsThunk = (
  pokemonId,
  quantity,
  orderId
) => async () => {
  try {
    await axios.put('/api/cart', {
      pokemonId: pokemonId,
      quantity: quantity,
      orderId: orderId
    })
  } catch (err) {
    console.error(err)
  }
}

export const getCartItemsThunk = userId => async dispatch => {
  try {
    dispatch(startLoading())
    const order = await axios.get(`/api/cart/${userId}`)
    const orderId = order.data[0].id
    const pokemon = order.data[0].pokemons

    dispatch(getCartItems(pokemon, orderId))
    dispatch(endLoading())
  } catch (err) {
    console.error(err)
  }
}

export const removePokemonThunk = (orderId, pokemonId) => async dispatch => {
  try {
    const order = await axios.delete(`/api/cart/sub/${orderId}/${pokemonId}`)
    const pokemon = order.data.pokemons
    dispatch(getCartItems(pokemon, orderId))
  } catch (err) {
    console.error(err)
  }
}

export const completePurchaseThunk = orderId => async () => {
  try {
    await axios.put(`/api/cart/${orderId}/checkout`, {
      pending: false
    })
  } catch (err) {
    console.error(err)
  }
}

// export const getUserOrdersThunk = userId => async dispatch => {
//   try {
//     const userOrders = await axios.get(`/api/cart/${userId}`)

//   } catch (err) {
//     console.error(err)
//   }
// }

//reducer
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {...state, pokemon: action.pokemon, order: action.order}
    case GET_CART:
      return {...state, pokemon: action.pokemon, order: action.order}
    case REMOVE_POKEMON:
      return {
        ...state,
        pokemon: state.pokemon.filter(mon => mon.id !== action.pokemonId)
      }
    default:
      return state
  }
}
