import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Grid, Button, Icon } from 'semantic-ui-react'

import Login from './components/Login'
import Menu from './components/Navigation'
import EventsHome from './components/events/EventsHome'
import Event from './components/events/Event'

class App extends Component {
 logOut = () => {
   if (window.confirm('Log out?')) {
     window.localStorage.removeItem('loggedUser')
     window.location.assign('/')
   }
 }

 render() {
   return (
     <Router>
       <Grid style={{ minHeight: '100vh' }}>
         <Grid.Column width={4}>
           <Grid.Row style={{ height: '2vh' }} />
           <Grid.Row style={{ height: '20vh' }}>
             {window.localStorage.getItem('loggedUser') && (
             <div style={{ paddingLeft: '2em' }}>
               <Button icon inverted onClick={this.logOut}>
                 <Icon flipped="horizontally" size="big" color="black" name="log out" />
               </Button>
             </div>
             )}
           </Grid.Row>
           {window.localStorage.getItem('loggedUser')
           && <Menu />
            }
         </Grid.Column>
         <Grid.Column width={11}>
           <Grid.Row style={{ height: '8vh' }} />
           <Grid.Row style={{ height: '5vh' }}>
             <h1 style={{
               fontWeight: 'bold',
             }}
             >
            Event Manager
             </h1>
           </Grid.Row>
           <Grid.Row style={{ height: '8vh' }} />
           <Grid.Row
             style={{
               minHeight: '75vh',
               background: 'white',
               padding: '2em',
               borderLeft: '0.7em dotted black',
               borderTop: '0.7em dotted black',
             }}
           >
             <Route exact path="/" render={() => <Login />} />
             <Route exact path="/events" render={() => <EventsHome />} />
             <Route
               exact
               path="/event/:id"
               render={({ match }) => <Event eventID={match.params.id} />}
             />
             <Route
               exact
               path="/event/event/:id"
               render={() => <EventsHome />}
             />
           </Grid.Row>
         </Grid.Column>
       </Grid>
     </Router>
   );
 }
}

export default App;
