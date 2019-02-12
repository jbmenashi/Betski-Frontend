
function reducer(state = initialState, action) {
  switch (action.type) {

    case 'LOGOUT':
      localStorage.clear()
      return {
        ...state,
        currentUserId: undefined,
        currentUserName: undefined,
        currentUserBalance: undefined,
        usernameInput: "",
        passwordInput: "",
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
