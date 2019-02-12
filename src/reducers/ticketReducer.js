import {
  INPUT_WAGER,
  FETCH_TICKETS,
  SET_CURRENT_TICKET
} from '../constants/ActionTypes'

const initialState = {
  tickets: [],
  wagerInput: 0,
  isActiveTicket: false,
  currentTicketId: undefined
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "INPUT_WAGER":
      return {...state, wagerInput: action.payload}
    case "FETCH_TICKETS":
      return {...state, tickets: action.payload}
    case "SET_CURRENT_TICKET":
      return {...state, currentTicketId: action.payload, isActiveTicket: true}
    default:
      return state
  }
}
