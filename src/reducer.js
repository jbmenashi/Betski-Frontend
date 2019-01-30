const initialState = {
  games: []
}

function reducer(state = initialState, action) {
  console.log(state);
  switch (action.type) {
    case "FETCH_GAMES":
      return {...state, games: action.payload}
    default:
      return state
  }
}

export default reducer
