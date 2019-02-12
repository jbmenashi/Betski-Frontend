import {
  INPUT_USERNAME,
  INPUT_PASSWORD,
  SUBMIT_LOGIN,
  ADJUST_BALANCE,
  CLEAR_USER_DATA
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
    case 'ADJUST_BALANCE':
      return {...state, currentUserBalance: state.currentUserBalance + action.payload}
    case 'CLEAR_USER_DATA':
      localStorage.clear()
      return {...state, currentUserId: undefined, currentUserName: undefined, currentUserBalance: undefined, usernameInput: "", passwordInput: ""}
    default:
      return state
  }
}
