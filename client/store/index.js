import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import userReducer from './userReducer'
import {pokemonReducer} from './pokemonReducer'
import {loadingReducer} from './loadingReducer'
import {cartReducer} from './cartReducer'

const reducer = combineReducers({
  user: userReducer,
  pokemons: pokemonReducer,
  loading: loadingReducer,
  cart: cartReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './userReducer'
