import React from 'react';
import UserData from './user/UserData'

const Home = () => (
  <div>
    <h1>Welcome</h1>
    <p style={{ fontSize: '1.5em' }}>
     With Event Manager you can discover events, create a new one or check your participations.
    </p>
    {window.localStorage.getItem('loggedUser')
          && <UserData />}
  </div>
)

export default Home
