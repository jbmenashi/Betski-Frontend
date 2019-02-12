import {
  FETCH_GAMES,
  FETCH_TEAMS,
  SELECT_SPORT,
  SET_GAME_ID
} from '../constants/ActionTypes'

const initialState = {
  games: [],
  filteredGames: [],
  teams: [],
  currentGameId: undefined
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GAMES":
      return {...state, games: action.payload}
    case "FETCH_TEAMS":
      return {...state, teams: action.payload}
    case "SELECT_SPORT":
      return {...state, filteredGames: state.games.filter(game => game.sport === action.payload)}
    case "SET_GAME_ID":
      return {...state, currentGameId: action.payload}
    default:
      return state
  }
}
