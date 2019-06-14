import axios from 'axios'
import {startLoading, endLoading} from './loadingReducer'

//initial state
const initialState = {
  pokemons: [],
  pokemon: {}
}

//action type
const GET_POKEMONS = 'GET_POKEMONS'
const GET_SINGLE_POKEMON = 'GET_SINGLE_POKEMON'
const ADD_POKEMON = 'ADD_POKEMON'

//action creator
export const getPokemons = pokemons => ({type: GET_POKEMONS, pokemons})
export const getSinglePokemon = pokemon => ({type: GET_SINGLE_POKEMON, pokemon})
export const addPokemon = pokemon => ({type: ADD_POKEMON, pokemon})

//thunk
export const getPokemonsThunk = () => async dispatch => {
  try {
    dispatch(startLoading())
    const {data} = await axios.get('/api/products')
    dispatch(getPokemons(data))
    dispatch(endLoading())
  } catch (err) {
    console.log(err)
  }
}

export const getSinglePokemonThunk = pokemonId => async dispatch => {
  try {
    dispatch(startLoading())
    const {data} = await axios.get(`/api/products/${pokemonId}`)
    dispatch(getSinglePokemon(data))
    dispatch(endLoading())
  } catch (err) {
    console.log(err)
  }
}

export const addingPokemonThunk = pokemon => async dispatch => {
  try {
    console.log('pokemon obj in thunk', pokemon)
    const {data} = await axios.post('/api/products', pokemon)
    dispatch(addPokemon(data))
  } catch (err) {
    console.error(err)
  }
}

//reducer
export const pokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {...state, pokemons: action.pokemons}
    case GET_SINGLE_POKEMON:
      return action.pokemon
    case ADD_POKEMON: {
      console.log('state of pokemons', state.pokemons)
      return {...state, pokemons: [...state.pokemons, action.pokemon]}
    }
    default:
      return state
  }
}
