import axios from 'axios'

//initial state

//action type
const GET_POKEMONS = 'GET_POKEMONS'
const GET_SINGLE_POKEMON = 'GET_SINGLE_POKEMON'

//action creator
export const getPokemons = pokemons => ({type: GET_POKEMONS, pokemons})
export const getSinglePokemon = pokemon => ({type: GET_SINGLE_POKEMON, pokemon})

//thunk
export const getPokemonsThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(getPokemons(data))
  } catch (err) {
    console.log(err)
  }
}

export const getSinglePokemonThunk = pokemonId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${pokemonId}`)
    dispatch(getSinglePokemon(data))
  } catch (err) {
    console.log(err)
  }
}

//reducer
export const pokemonReducer = (state = [], action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return action.pokemons
    case GET_SINGLE_POKEMON:
      return action.pokemon
    default:
      return state
  }
}
