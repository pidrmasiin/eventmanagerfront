import React from 'react'
import { Menu } from 'semantic-ui-react'
import Events from './Events'
import NewEvent from './NewEvent'

class EventsHome extends React.Component {
    state = {
      activeItem: 'All',
    }


    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
      const { activeItem } = this.state
      return (
        <div>
          <h2>Events</h2>
          <p>Here you can discover events and create a new ones</p>
          <Menu fluid tabular>
            <Menu.Item name="All" active={activeItem === 'All'} onClick={this.handleItemClick} />
            <Menu.Item style={{ color: 'green' }} name="New event" active={activeItem === 'New event'} onClick={this.handleItemClick} />
          </Menu>
          {activeItem === 'All' && <Events /> }
          {activeItem === 'New event' && <NewEvent /> }
        </div>

      )
    }
}

export default EventsHome
