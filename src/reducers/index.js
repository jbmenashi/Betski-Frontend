import { combineReducers } from 'redux'
import userReducer from './userReducer'
import gameReducer from './gameReducer'
import betReducer from './betReducer'
import ticketReducer from './ticketReducer'

const rootReducer = combineReducers({
  userReducer,
  gameReducer,
  betReducer,
  ticketReducer
})

export default rootReducer
