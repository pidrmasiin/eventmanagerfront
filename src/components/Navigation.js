import React from 'react';
import { Link } from 'react-router-dom';

const linkPadding = { textAlign: 'center', paddingBottom: '2em' }

class NavBar extends React.Component {
  state= {
    currentOne: 'home',
  }

  componentDidMount = () => {
    if (this.state.currentOne === 'home') {
      document.getElementById('home').style.textDecoration = 'underline';
    }
  }

  chosenOne = (id) => {
    this.setState({
      currentOne: id,
    })
    document.getElementById(id).style.textDecoration = 'underline';
    if (this.state.currentOne.length > 0 && this.state.currentOne !== id) {
      document.getElementById(this.state.currentOne).style.textDecoration = 'none';
    }
  }

  render() {
    return (
      <div style={{ paddingLeft: '1em', paddingRight: '2em' }}>
        <Link onClick={() => this.chosenOne('home')} style={{ color: 'black' }} to="/">
          <h2 id="home" style={linkPadding}>Home</h2>
        </Link>
        <Link onClick={() => this.chosenOne('events')} style={{ color: 'black' }} to="/events">
          <h2 id="events" style={linkPadding}> Events</h2>
        </Link>
      </div>
    );
  }
}


export default NavBar;
