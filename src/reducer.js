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
  wagerInput: 0,
  currentTicketId: undefined,
  isActiveTicket: false,
  activeBets: [],
  activeMultiplier: 1,
  betForPost: [],
  tickets: [],
  closedTickets: []
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_GAMES":
      return {...state, games: action.payload}
    case "FETCH_TICKETS":
      return {...state, tickets: action.payload}
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
    case "INPUT_WAGER":
      return {...state, wagerInput: action.payload}
    case "SET_CURRENT_TICKET":
      return {...state, currentTicketId: action.payload, isActiveTicket: true}
    case "PUSH_BET_TO_ACTIVE_BETS":
      return {...state, activeBets: [...state.activeBets, action.payload]}
    case "INIT_ACTIVE_MULTIPLIER":
      return {...state, activeMultiplier: action.payload}
    case "CALC_ACTIVE_MULTIPLIER":
      return {...state, activeMultiplier: state.activeMultiplier * action.payload}
    case "REMOVE_BET_FROM_ACTIVE":
      return {...state, activeMultiplier: state.activeMultiplier / action.divide, activeBets: [...state.activeBets.slice(0, action.payload), ...state.activeBets.slice(action.payload + 1, state.activeBets.length)]}
    case "REMOVE_TICKET_FROM_ACTIVE":
      return {...state, isActiveTicket: false, currentTicketId: undefined}
    case 'ADJUST_BALANCE':
      return {...state, currentUserBalance: state.currentUserBalance + action.payload, activeBets: [], activeMultiplier: 1, betForPost: [], isBetSelected: false, wagerInput: 0}
    case 'CLOSE_TICKET':
      return {...state, tickets: [...state.tickets.slice(0, action.index), ...state.tickets.slice(action.index + 1, state.tickets.length)], closedTickets: [...state.closedTickets, action.ticket]}
    default:
      return state
  }
}

export default reducer
