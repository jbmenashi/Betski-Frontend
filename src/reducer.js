const initialState = {
  currentUserId: undefined,
  currentUserName: undefined,
  currentUserBalance: undefined,
  loginInput: "",
  games: [],
  filteredGames: [],
  currentGameId: undefined,
  selectedOdds: undefined,
  selectedAwayTeam: undefined,
  selectedHomeTeam: undefined,
  selectedSpread: undefined,
  selectedTotal: undefined,
  selectedBetType: undefined,
  isBetSelected: false,
  practiceWagerInput: 100,
  currentTicketId: undefined,
  isActiveTicket: false,
  activeBets: [],
  betForPost: [],
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
      return {...state, filteredGames: state.games.filter(game => game.sport === action.payload), isBetSelected: false}
    case "SELECT_BET":
      return {
        ...state,
        isBetSelected: true,
        currentGameId: action.gameId,
        selectedOdds: action.odds,
        selectedAwayTeam: action.awayTeam,
        selectedHomeTeam: action.homeTeam,
        selectedSpread: action.spread,
        selectedTotal: action.total,
        selectedBetType: action.betType,
        betForPost: action.betForPost,
        practiceWagerInput: 100
      }
    case "INPUT_PRACTICE_WAGER":
      return {...state, practiceWagerInput: action.payload}
    case "SET_CURRENT_TICKET":
      return {...state, currentTicketId: action.payload, isActiveTicket: true}
    case "PUSH_BET_TO_ACTIVE_BETS":
      return {...state, activeBets: [...state.activeBets, action.payload]}
    default:
      return state
  }
}

export default reducer
