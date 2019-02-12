import {
  INPUT_PRACTICE_WAGER,
  INIT_ACTIVE_MULTIPLIER,
  CALC_ACTIVE_MULTIPLIER,
  PUSH_BET_TO_ACTIVE_BETS,
  REMOVE_BET_FROM_ACTIVE,
  SELECT_BET,
  UNSELECT_BET,
  CLEAR_ACTIVE_BETS
} from '../constants/ActionTypes'

const initialState = {
  activeMultiplier: 1,
  activeBets: [],
  isBetSelected: false,
  selectedOdds: undefined,
  selectedAwayTeam: undefined,
  selectedHomeTeam: undefined,
  selectedSpread: undefined,
  selectedTotal: undefined,
  selectedBetType: undefined,
  betForPost: [],
  practiceWagerInput: 100
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
    case "REMOVE_BET_FROM_ACTIVE":
      return {...state, activeMultiplier: state.activeMultiplier / action.divide, activeBets: [...state.activeBets.slice(0, action.payload), ...state.activeBets.slice(action.payload + 1, state.activeBets.length)]}
    case "SELECT_BET":
      return {...state, isBetSelected: true, selectedOdds: action.odds, selectedAwayTeam: action.awayTeam, selectedHomeTeam: action.homeTeam, selectedSpread: action.spread, selectedTotal: action.total, selectedBetType: action.betType, betForPost: action.betForPost, practiceWagerInput: 100}
    case "UNSELECT_BET":
      return {...state, isBetSelected: false}
    case "CLEAR_ACTIVE_BETS":
      return {...state, activeBets: [], activeMultiplier: 1, betForPost: []}
    default:
      return state
  }
}
