import React from 'react'
import { connect } from 'react-redux';
import { Table, Button } from 'semantic-ui-react'
import { setParticipation, getUser } from '../../reducers/userReducer';
import eventService from '../../services/eventService'
import EventCard from './EventCard'

class Event extends React.Component {
    state= {
      event: {},
    }

    componentWillMount = async () => {
      const events = await eventService.getAll()
      const event = events.find(x => x.id === this.props.eventID)
      this.setState({
        event,
      })
    }

    setParticipation = async (status) => {
      const body = {
        status,
        id: this.state.event.id,
      }
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      const token = JSON.parse(loggedUserJSON).token
      await this.props.setParticipation(body, this.props.user.id, token)
      const name = JSON.parse(loggedUserJSON).username
      const user = { username: name, token }
      await this.props.getUser(user)
      // child component update trick. not so nice but works
      this.setState({
        event: {},
      })
      this.componentWillMount()
    }


    render() {
      const participants = this.state.event.participants
      if (this.state.event.name) {
        return (
          <div>
            <EventCard eventID={this.state.event.id} />
            <br />
            <b>Set/Change your status</b>
            <br />
            <Button.Group compact>
              <Button onClick={() => this.setParticipation('yes')} color="green">Yes</Button>
              <Button onClick={() => this.setParticipation('maybe')} color="brown">Maybe</Button>
              <Button onClick={() => this.setParticipation('no')} color="red">No</Button>
            </Button.Group>
            <h2>Participants</h2>
            <Table basic="very">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row positive>
                  <Table.Cell>
                    Yes
                  </Table.Cell>
                  <Table.Cell>
                    {participants.filter(x => x.status.toLowerCase() === 'yes').length}
                  </Table.Cell>
                </Table.Row>
                <Table.Row style={{ color: 'grey' }}>
                  <Table.Cell>
                    Maybe
                  </Table.Cell>
                  <Table.Cell>
                    {participants.filter(x => x.status.toLowerCase() === 'maybe').length}
                  </Table.Cell>
                </Table.Row>
                <Table.Row negative>
                  <Table.Cell>
                     No
                  </Table.Cell>
                  <Table.Cell>
                    {participants.filter(x => x.status.toLowerCase() === 'no').length}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <b>Total</b>
                  </Table.Cell>
                  <Table.Cell>
                    <b>{this.state.event.participants.length}</b>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        )
      }
      return (
        <p>Something went wrong. Cant find event</p>
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
    setParticipation,
    getUser,
  },
)(Event);
