import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import loginService from '../services/loginService'
import Home from './Home'

class Login extends React.Component {
    log = async (e) => {
      e.preventDefault()
      try {
        const user = await loginService.login({
          username: e.target.username.value,
          password: e.target.password.value,
        })
        window.localStorage.setItem('loggedUser', JSON.stringify(user))
        window.location.reload()
      } catch (exception) {
        console.log('virhe')
      }
    }


    render() {
      return (
        <div>
          <Home />
          <br />
          {!window.localStorage.getItem('loggedUser')
          && (
          <div>
            <h2>Log in</h2>

            <form onSubmit={this.log}>
              <div>
                Username
                <Form.Input
                  name="username"
                />
              </div>
              <div>
                Password
                <Form.Input
                  type="password"
                  name="password"
                />
              </div>
              <br />
              <Button inverted color="green" type="submit">Kirjaudu</Button>
            </form>
          </div>
          )
        }
        </div>
      )
    }
}

export default Login;
