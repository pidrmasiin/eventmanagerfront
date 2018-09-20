
import eventService from '../services/eventService'

const eventReducer = (store = [], action) => {
  if (action.type === 'GET_ALL') {
    return action.data
  }
  return store
}

export const getEvents = token => async (dispatch) => {
  eventService.setToken(token)
  const all = await eventService.getAll()
  dispatch({
    type: 'GET_ALL',
    data: all,
  })
}

export default eventReducer
