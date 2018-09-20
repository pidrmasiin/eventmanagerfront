import React from 'react'
import { Form } from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import eventService from '../../services/eventService'

import 'react-datepicker/dist/react-datepicker.css';

class NewEvent extends React.Component {
  locationOptions = [
    { text: 'Hesat', key: 'Hesat', value: 'Hesat' },
    { text: 'Torit', key: 'Torit', value: 'Torit' },
    { text: 'Turut', key: 'Turut', value: 'Turut' },
  ]

  constructor(props) {
    super(props)
    this.state = {
      startTime: moment(),
      endTime: moment(),
      name: '',
      details: '',
      // location: '',
    };
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
  }

    onSubmit = async () => {
      const accept = `Add event:${this.state.name
      }\ndetails:${this.state.details
      }\nstarts:${this.state.startTime.toString()
      }\nends:${this.state.endTime.toString()}`
      if (window.confirm(accept)) {
        await eventService.addEvent(this.state)
        window.location.assign('/')
      }
    }

    handleChange = (e, { name, value }) => {
      this.setState({ [name]: value })
    }

    handleStartTimeChange(date) {
      this.setState({
        startTime: date,
      });
    }

    handleEndTimeChange(date) {
      this.setState({
        endTime: date,
      });
    }

    render() {
      const { name, details } = this.state
      return (
        <Form onSubmit={this.onSubmit}>
          <style>
            {`.react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list {
            padding-left: 0;
            padding-right: 0;
          }`}
          </style>
          <b>Start time</b>
          <DatePicker
            selected={this.state.startTime}
            onChange={this.handleStartTimeChange}
            showTimeSelect
            dateFormat="LLL"
            label="Start time"
          />
          <b>End time</b>
          <DatePicker
            selected={this.state.endTime}
            onChange={this.handleEndTimeChange}
            showTimeSelect
            dateFormat="LLL"
            label="Start time"
          />
          <Form.Field>
            <Form.Input onChange={this.handleChange} fluid label="Event" name="name" value={name} placeholder="Event" />
          </Form.Field>
          <Form.Field>
            <Form.Input onChange={this.handleChange} fluid label="Details" name="details" value={details} placeholder="Details" />
          </Form.Field>
          {/* <Form.Field>
          <Form.Dropdown onChange={this.handleChange}
          fluid search selection name="location" value={location}
          label="Location" placeholder="Select Location" options={this.locationOptions} />
          </Form.Field> */}
          <Form.Button color="green" type="submit">Submit</Form.Button>
        </Form>

      )
    }
}


export default NewEvent
