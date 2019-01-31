const initialState = {
  currentUserId: undefined,
  currentUserName: undefined,
  currentUserBalance: undefined,
  loginInput: "",
  games: [],
  filteredGames: [],
  selectedOdds: undefined,
  selectedAwayTeam: undefined,
  selectedHomeTeam: undefined,
  selectedSpread: undefined,
  selectedTotal: undefined,
  selectedBetType: undefined
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_GAMES":
      return {...state, games: action.payload}
    case "INPUT_LOGIN":
      return {...state, loginInput: action.payload}
    case "SUBMIT_LOGIN":
      return {...state, currentUserId: action.id, currentUserName: action.name, currentUserBalance: action.balance}
    case "SELECT_SPORT":
      return {...state, filteredGames: state.games.filter(game => game.sport === action.payload)}
    case "SELECT_BET":
      return {
        ...state,
        selectedOdds: action.odds,
        selectedAwayTeam: action.awayTeam,
        selectedHomeTeam: action.homeTeam,
        selectedSpread: action.spread,
        selectedTotal: action.total,
        selectedBetType: action.betType
      }
    default:
      return state
  }
}

export default reducer
