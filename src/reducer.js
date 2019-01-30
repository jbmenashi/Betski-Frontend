const initialState = {
  currentUserId: undefined,
  loginInput: "",
  games: []
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_GAMES":
      return {...state, games: action.payload}
    case "INPUT_LOGIN":
      return {...state, loginInput: action.payload}
    case "SUBMIT_LOGIN":
      return {...state, currentUserId: action.payload}
    default:
      return state
  }
}

export default reducer
