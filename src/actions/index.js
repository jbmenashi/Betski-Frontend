import * as types from '../constants/ActionTypes'

export const removeBetFromActive = (index, divide) => {
  return {
    type: types.REMOVE_BET_FROM_ACTIVE,
    payload: index,
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
