import axios from 'axios'

const baseUrl = '/api/users'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getUser = async (user) => {
  const config = {
    headers: { Authorization: token },
  }
  const all = await axios.get(baseUrl, config)
  const theUser = all.data.find(x => x.username === user)
  return theUser
}


// body form must be => {status: "", id: ""}
const setParticipants = async (body, id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, body, config)
  return response.data
}

export default {
  getUser,
  setToken,
  setParticipants,
}
