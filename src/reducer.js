const initialState = {
  currentGameId: undefined,
  isBetSelected: false,
  selectedOdds: undefined,
  selectedAwayTeam: undefined,
  selectedHomeTeam: undefined,
  selectedSpread: undefined,
  selectedTotal: undefined,
  selectedBetType: undefined,
  betForPost: [],
  closedTickets: [],
}

function reducer(state = initialState, action) {
  switch (action.type) {

    case "UNSELECT_BET":
      return {...state, isBetSelected: false}


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
    case "REMOVE_BET_FROM_ACTIVE":
      return {...state, activeMultiplier: state.activeMultiplier / action.divide, activeBets: [...state.activeBets.slice(0, action.payload), ...state.activeBets.slice(action.payload + 1, state.activeBets.length)]}
    case "REMOVE_TICKET_FROM_ACTIVE":
      return {...state, isActiveTicket: false, currentTicketId: undefined, activeBets: []}
    case 'ADJUST_BALANCE':
      return {...state, currentUserBalance: state.currentUserBalance + action.payload, activeBets: [], activeMultiplier: 1, betForPost: [], wagerInput: 0}
    case 'CLOSE_TICKET':
      return {...state, tickets: [...state.tickets.slice(0, action.index), ...state.tickets.slice(action.index + 1, state.tickets.length)], closedTickets: [...state.closedTickets, action.ticket]}
    case 'LOGOUT':
      localStorage.clear()
      return {
        ...state,
        currentUserId: undefined,
        currentUserName: undefined,
        currentUserBalance: undefined,
        usernameInput: '',
        passwordInput: '',
        activeBets: [],
        activeMultiplier: 1,
        betForPost: [],
        currentGameId: undefined,
        currentTicketId: undefined,
        filteredGames: [],
        games: [],
        isActiveTicket: false,
        isBetSelected: false
      }
    default:
      return state
  }
}

export default reducer
