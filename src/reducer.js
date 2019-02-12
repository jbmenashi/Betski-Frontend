const initialState = {
  currentGameId: undefined,
  selectedOdds: undefined,
  selectedAwayTeam: undefined,
  selectedHomeTeam: undefined,
  selectedSpread: undefined,
  selectedTotal: undefined,
  selectedBetType: undefined,
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "OLD_SELECT_BET":
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
    case 'ADJUST_BALANCE':
      return {
        ...state,
        currentUserBalance: state.currentUserBalance + action.payload,
        wagerInput: 0
      }
    case 'LOGOUT':
      localStorage.clear()
      return {
        ...state,
        currentUserId: undefined,
        currentUserName: undefined,
        currentUserBalance: undefined,
        usernameInput: '',
        passwordInput: '',
        currentGameId: undefined,
        currentTicketId: undefined,
        filteredGames: [],
        games: [],
        isActiveTicket: false,
      }
    default:
      return state
  }
}

export default reducer
