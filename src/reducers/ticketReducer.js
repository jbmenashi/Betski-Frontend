import {
  INPUT_WAGER,
  FETCH_TICKETS
} from '../constants/ActionTypes'

const initialState = {
  tickets: [],
  wagerInput: 0,
}

export default (state - initialState, action) => {
  switch (action.type) {
    case "INPUT_WAGER":
      return {...state, wagerInput: action.payload}
    case "FETCH_TICKETS":
      return {...state, tickets: action.payload}
    default:
      return state
  }
}
