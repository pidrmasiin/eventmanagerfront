import React from 'react';
import {
 Card, Form, Modal, Button 
} from 'semantic-ui-react';
import Calendar from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import eventService from '../../services/eventService';
import EventCard from './EventCard';
import Event from './Event';

Calendar.setLocalizer(Calendar.momentLocalizer(moment))

class Events extends React.Component {
    state = {
      events: [],
      search: '',
      calendarEvs: [],
      modal: false,
      selectedEvent: false,
    }

    componentDidMount = async () => {
      const loggedUserJSON = window.localStorage.getItem('loggedUser')
      if (loggedUserJSON) {
        eventService.setToken(JSON.parse(loggedUserJSON).token)
        const events = await eventService.getAll()
        const calendarEvs = events.map(x => ({
          start: x.startTime,
          end: x.endTime,
          title: x.name,
          id: x.id,
        }))
        this.setState({
          events,
          calendarEvs,
        })
      }
    }

    handleChange = prop => (event) => {
      this.setState({
        [prop]: event.target.value,
      });
    };

    checkEven = (e) => {
      this.setState({
        selectedEvent: e.id,
      })
      this.setModal()
    }

    setModal = () => {
      this.setState({
        modal: !this.state.modal,
      })
    }

    render() {
      const bySearchTerm = (event) => {
        if (this.state.search.length === 0) {
          return true
        }
        return event.name.toLowerCase().includes(this.state.search.toLowerCase())
      }
      const itemsToShow = this.state.events.filter(bySearchTerm)
      return (
        <div>
          <p>Here you can find events. If you scrolla down you can also find events by name</p>
          <h2>Event Calendar</h2>
          <Calendar
            defaultDate={new Date()}
            defaultView="month"
            events={this.state.calendarEvs}
            style={{ height: '100vh', width: '80vh' }}
            views={['month']}
            selectable
            onSelectEvent={this.checkEven}

          />
          <Form>
            <Form.Field>
              <label>
                <p style={{ color: 'darkgreen' }}>Find events by name</p>
                <input
                  placeholder="Type something"
                  value={this.state.search}
                  onChange={this.handleChange('search')}
                />
              </label>
            </Form.Field>
          </Form>
          <br />
          <p>
            Click an event to participate and get more information.
            You can also leave a comment.
          </p>
          <br />
          <Card.Group>
            {itemsToShow.map(x => (
              <EventCard key={x.id} eventID={x.id} />
            ))}

          </Card.Group>
          <Modal open={this.state.modal}>
            <Modal.Header>
              <Button onClick={this.setModal}>close</Button>
            </Modal.Header>
            <Modal.Content image>
              <Modal.Description>
                {this.state.selectedEvent && <Event eventID={this.state.selectedEvent} /> }
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </div>

      )
    }
}


export default Events
