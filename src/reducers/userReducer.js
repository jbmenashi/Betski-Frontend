import {
  INPUT_USERNAME,
  INPUT_PASSWORD,
  SUBMIT_LOGIN
} from '../constants/ActionTypes'

const initialState = {
  currentUserId: undefined,
  currentUserName: undefined,
  currentUserBalance: undefined,
  usernameInput: "",
  passwordInput: "",
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "INPUT_USERNAME":
      return {...state, usernameInput: action.payload}
    case "INPUT_PASSWORD":
      return {...state, passwordInput: action.payload}
    case "SUBMIT_LOGIN":
      return {...state, currentUserId: action.id, currentUserName: action.name, currentUserBalance: action.balance}
    default:
      return state
  }
}
