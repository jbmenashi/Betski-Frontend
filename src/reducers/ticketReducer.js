import {
  INPUT_WAGER,
  RESET_WAGER_INPUT,
  FETCH_TICKETS,
  SET_CURRENT_TICKET,
  REMOVE_TICKET_FROM_ACTIVE,
  CLOSE_TICKET,
  CLEAR_TICKET_DATA
} from '../constants/ActionTypes'

const initialState = {
  tickets: [],
  closedTickets: [],
  wagerInput: 0,
  isActiveTicket: false,
  currentTicketId: undefined,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INPUT_WAGER:
      return {...state, wagerInput: action.payload}
    case RESET_WAGER_INPUT:
      return {...state, wagerInput: 0}
    case FETCH_TICKETS:
      return {...state, tickets: action.payload}
    case SET_CURRENT_TICKET:
      return {...state, currentTicketId: action.payload, isActiveTicket: true}
    case REMOVE_TICKET_FROM_ACTIVE:
      return {...state, isActiveTicket: false, currentTicketId: undefined}
    case CLOSE_TICKET:
      return {...state, tickets: [...state.tickets.slice(0, action.index), ...state.tickets.slice(action.index + 1, state.tickets.length)], closedTickets: [...state.closedTickets, action.ticket]}
    case CLEAR_TICKET_DATA:
      return {...state, currentTicketId: undefined, isActiveTicket: false}
    default:
      return state
  }
}
