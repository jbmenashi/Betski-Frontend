import {
  INPUT_PRACTICE_WAGER,
  INIT_ACTIVE_MULTIPLIER,
  CALC_ACTIVE_MULTIPLIER
} from '../constants/ActionTypes'

const initialState = {
  practiceWagerInput: 100,
  activeMultiplier: 1,
}

export default (state - initialState, action) => {
  switch (action.type) {
    case "INPUT_PRACTICE_WAGER":
      return {...state, practiceWagerInput: action.payload}
    case "INIT_ACTIVE_MULTIPLIER":
      return {...state, activeMultiplier: action.payload}
    case "CALC_ACTIVE_MULTIPLIER":
      return {...state, activeMultiplier: state.activeMultiplier * action.payload}
    default:
      return state
  }
}
