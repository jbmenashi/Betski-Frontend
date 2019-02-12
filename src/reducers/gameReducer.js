import {
  FETCH_GAMES,
  FETCH_TEAMS,
} from '../constants/ActionTypes'

const initialState = {
  games: [],
  filteredGames: [],
  teams: []
}

export default (state - initialState, action) => {
  switch (action.type) {
    case "FETCH_GAMES":
      return {...state, games: action.payload}
    case "FETCH_TEAMS":
      return {...state, teams: action.payload}
    default:
      return state
  }
}
