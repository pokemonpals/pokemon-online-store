import axios from 'axios'

//initial state
const initialState = {
  pokemon: []
}

//action type
const ADD_TO_CART = 'ADD_TO_CART'
const GET_CART = 'GET_CART'

//action creator
export const addToCart = pokemon => ({
  type: ADD_TO_CART,
  pokemon
})
// export const getCart = cartId => ({
//   type: GET_CART,
//   cartId
// })

//thunk
export const addToCartThunk = pokemonId => {
  console.log('CART THUNK RUNNING')
  return async dispatch => {
    try {
      const pokemon = await axios.get(`/api/products/${pokemonId}`)
      dispatch(addToCart(pokemon.data))
    } catch (err) {
      console.error(err)
    }
  }
}

//reducer
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      console.log('CART REDUCER RUNNING')
      return {...state, pokemon: [...state.pokemon, action.pokemon]}
    // case GET_CART:
    //   return {}
    default:
      return state
  }
}
