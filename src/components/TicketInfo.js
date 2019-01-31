import React, { Component } from 'react';
import BetList from './BetList'

class TicketInfo extends Component {

  render() {
    return (
      <div className="ticketInfo">
      <h2>New Ticket</h2>
      <BetList/>
      </div>
    );
  }

}

export default TicketInfo;
