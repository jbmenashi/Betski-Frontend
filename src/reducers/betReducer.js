import {
  INPUT_PRACTICE_WAGER,
  INIT_ACTIVE_MULTIPLIER,
  CALC_ACTIVE_MULTIPLIER,
  PUSH_BET_TO_ACTIVE_BETS,
  UNSELECT_BET
} from '../constants/ActionTypes'

const initialState = {
  practiceWagerInput: 100,
  activeMultiplier: 1,
  activeBets: [],
  isBetSelected: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "INPUT_PRACTICE_WAGER":
      return {...state, practiceWagerInput: action.payload}
    case "INIT_ACTIVE_MULTIPLIER":
      return {...state, activeMultiplier: action.payload}
    case "CALC_ACTIVE_MULTIPLIER":
      return {...state, activeMultiplier: state.activeMultiplier * action.payload}
    case "PUSH_BET_TO_ACTIVE_BETS":
      return {...state, activeBets: [...state.activeBets, action.payload]}
    case "UNSELECT_BET":
      return {...state, isBetSelected: false}
    default:
      return state
  }
}
