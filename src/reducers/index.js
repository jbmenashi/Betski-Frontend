import { combineReducers } from 'redux'
import user from './user'
import game from './game'
import bet from './bet'
import ticket from './ticket'

const rootReducer = combineReducers({
  user,
  game,
  bet,
  ticket
})

export default rootReducer
