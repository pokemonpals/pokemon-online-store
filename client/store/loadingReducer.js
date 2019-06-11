const START_LOADING = 'START_LOADING'
const END_LOADING = 'END_LOADING'

export const startLoading = () => ({type: START_LOADING})
export const endLoading = () => ({type: END_LOADING})

export const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case START_LOADING:
      return true
    case END_LOADING:
      return false
    default:
      return state
  }
}
