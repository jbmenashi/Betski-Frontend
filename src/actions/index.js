import * as types from '../constants/ActionTypes'

export const removeBetFromActive = (index, divide) => {
  return {
    type: types.REMOVE_BET_FROM_ACTIVE,
    index: index,
    divide: divide
  }
}

export const inputPracticeWager = (event) => {
  return {
    type: types.INPUT_PRACTICE_WAGER,
    payload: event.target.value
  }
}

export const fetchTeams = (data) => {
  return {
    type: types.FETCH_TEAMS,
    payload: data
  }
}


export const setGameId = (gameId) => {
  return {
    type: types.SET_GAME_ID,
    payload: gameId
  }
}

export const selectBet = (odds, awayTeam, homeTeam, spread, total, betType, betForPost) => {
  return {
    type: types.SELECT_BET,
    odds: odds,
    awayTeam: awayTeam,
    homeTeam: homeTeam,
    spread: spread,
    total: total,
    betType: betType,
    betForPost: betForPost
  }
}

export const inputUsername = (event) => {
  return {
    type: types.INPUT_USERNAME,
    payload: event.target.value
  }
}

export const inputPassword = (event) => {
  return {
    type: types.INPUT_PASSWORD,
    payload: event.target.value
  }
}

export const submitLogin = (userId, userName, userBalance) => {
  return {
    type: types.SUBMIT_LOGIN,
    id: userId,
    name: userName,
    balance: userBalance
  }
}

export const clearUserData = () => {
  return {
    type: types.CLEAR_USER_DATA
  }
}

export const clearGameData = () => {
  return {
    type: types.CLEAR_GAME_DATA
  }
}

export const clearTicketData = () => {
  return {
    type: types.CLEAR_TICKET_DATA
  }
}

export const unselectBet = () => {
  return {
    type: types.UNSELECT_BET
  }
}

export const clearActiveBets = () => {
  return {
    type: types.CLEAR_ACTIVE_BETS
  }
}

export const resetWagerInput = () => {
  return {
    type: types.RESET_WAGER_INPUT
  }
}

export const removeTicketFromActive = () => {
  return {
    type: types.REMOVE_TICKET_FROM_ACTIVE
  }
}

export const adjustBalance = (payout) => {
  return {
    type: types.ADJUST_BALANCE,
    payload: payout
  }
}

export const closeTicket = (index, ticket) => {
  return {
    type: types.CLOSE_TICKET,
    index: index,
    ticket: ticket
  }
}

export const selectSport = (sport) => {
  return {
    type: types.SELECT_SPORT,
    payload: sport
  }
}

export const inputWager = (event) => {
  return {
    type: types.INPUT_WAGER,
    payload: event.target.value
  }
}

export const fetchTickets = (tickets) => {
  return {
    type: types.FETCH_TICKETS,
    payload: tickets
  }
}

export const setCurrentTicket = (ticketId) => {
  return {
    type: types.SET_CURRENT_TICKET,
    payload: ticketId
  }
}

export const pushBetToActiveBets = (bet) => {
  return {
    type: types.PUSH_BET_TO_ACTIVE_BETS,
    payload: bet
  }
}

export const initActiveMultiplier = (multiplier) => {
  return {
    type: types.INIT_ACTIVE_MULTIPLIER,
    payload: multiplier
  }
}

export const calcActiveMulitplier = (multiplier) => {
  return {
    type: types.CALC_ACTIVE_MULTIPLIER,
    payload: multiplier
  }
}

export const fetchGames = (data) => {
  return {
    type: types.FETCH_GAMES,
    payload: data
  }
}
