import React from 'react'
import { connect } from 'react-redux';
import moment from 'moment';

import { Card, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

class EventCard extends React.Component {
    state={
      event: null,
      color: '',
      status: '',
    }

   componentDidMount = () => {
     const event = this.props.events.find(x => x.id === this.props.eventID)
     if (this.props.user.events) {
       const userStatus = this.props.user.events.find(x => x.event === this.props.eventID)
       if (userStatus) {
         this.setColor(userStatus.status)
       }
       this.setState({
         event,
       })
     }
   }

   setColor = (status) => {
     if (status.toLowerCase() === 'yes') {
       this.setState({
         color: 'green',
         status,
       })
     } if (status.toLowerCase() === 'no') {
       this.setState({
         color: 'red',
         status,
       })
     } if (status.toLowerCase() === 'maybe') {
       this.setState({
         color: 'brown',
         status,
       })
     }
   }

   render() {
     const x = this.state.event
     if (this.state.event) {
       return (
         <Link key={x.id} style={{ color: 'black', padding: '0.5em' }} to={`event/${x.id}`}>
           <Card fluid link>
             <Card.Content>
               <Icon name={`${x.name.toLowerCase()} ball`} size="big" style={{ float: 'right' }} />
               <Card.Header>{x.name}</Card.Header>
               <Card.Meta>
                 {moment(x.startTime).format('MMMM Do YYYY, h:mm a')}
                  –
                 {moment(x.endTime).format('MMMM Do YYYY, h:mm a')}
               </Card.Meta>
               <Card.Meta>Location</Card.Meta>
               <Card.Description>
                 {x.details}
               </Card.Description>
               {this.state.status && (
               <Card.Description>
                 <p>
                 Going:
                   {' '}
                   <span style={{ color: this.state.color }}>{this.state.status}</span>
                 </p>
               </Card.Description>
               )
               }
             </Card.Content>
           </Card>
         </Link>
       )
     } return (
       <div>
            Cant find events
            Check your homepage first
         <br />
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
)(EventCard);
