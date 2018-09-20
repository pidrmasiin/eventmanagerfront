import React from 'react'
import { connect } from 'react-redux';

import { Card } from 'semantic-ui-react'
import EventCard from '../events/EventCard'
import { getEvents } from '../../reducers/eventReducer';
import { getUser } from '../../reducers/userReducer';


class EventsHome extends React.Component {
    state = {
      name: '',
    }

    componentWillMount = async () => {
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      await this.props.getEvents(JSON.parse(loggedUserJSON).token)
      if (loggedUserJSON) {
        await this.props.getUser(JSON.parse(loggedUserJSON))
        const name = JSON.parse(loggedUserJSON).username
        this.setState({
          name,
        })
      }
    }

    render() {
      console.log('user', this.props)
      return (
        <div>
          <h3>
            Hey
            {' '}
            {this.state.name}
          </h3>
          <p>You have set status to these events</p>
          <Card.Group>
            {this.props.user.events
              && this.props.user.events.map(x => (
                <EventCard
                  status={x.status}
                  key={x._id}
                  eventID={x.event}
                />
              ))}
          </Card.Group>
        </div>

      )
    }
}

const mapStateToProps = state => ({
  events: state.events,
  user: state.user,
});


export default connect(
  mapStateToProps,
  {
    getEvents,
    getUser,
  },
)(EventsHome);
