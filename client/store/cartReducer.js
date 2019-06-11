import axios from 'axios'
import {startLoading, endLoading} from './loadingReducer'

//initial state

//action type
const GET_ITEMS_IN_CART = 'GET_ITEMS_IN_CART'

//action creator
export const getItems = items => ({type: GET_ITEMS_IN_CART, items})

//thunk
export const getItemsThunk = () => async dispatch => {
  try {
    dispatch(startLoading())
    const {data} = await axios.get('/api/cart')
    dispatch(getItems(data))
    dispatch(endLoading())
  } catch (err) {
    console.log(err)
  }
}

//reducer
export const cartReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ITEMS_IN_CART:
      return action.items
    default:
      return state
  }
}
