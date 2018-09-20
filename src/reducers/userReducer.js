import userService from '../services/userService'

const userReducer = (store = [], action) => {
  if (action.type === 'GET_USER') {
    return action.data
  } if (action.type === 'SET_USER') {
    return action.data
  }
  return store
}

export const getUser = user => async (dispatch) => {
  userService.setToken(user.token)
  const all = await userService.getUser(user.username)
  dispatch({
    type: 'GET_USER',
    data: all,
  })
}

export const setParticipation = (body, id, token) => async (dispatch) => {
  userService.setToken(token)
  const all = await userService.setParticipants(body, id)
  dispatch({
    type: 'SET_USER',
    data: all,
  })
}

export default userReducer
