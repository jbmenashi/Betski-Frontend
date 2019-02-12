import React, { Component } from 'react';
import {connect} from 'react-redux';
import OpenTicket from '../components/OpenTicket'

const mapStateToProps = state => {
  return {
    tickets: state.ticket.tickets,
    currentUserId: state.user.currentUserId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTickets: (tickets) => dispatch({type: "FETCH_TICKETS", payload: tickets})
  }
}

class OpenTicketsContainer extends Component {

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/users/${this.props.currentUserId}/tickets`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(tickets => {
      this.props.fetchTickets(tickets)
    })
  }

  render() {
    return (
      <div id="OpenTicketsContainer" className="container">
        <h2>Open Tickets</h2>
        <div className="row no-gutter">
          {this.props.tickets.filter(ticket => ticket.submitted === true && ticket.closed === false).map(ticket => <OpenTicket {...ticket} key={ticket.id}/>)}
        </div>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(OpenTicketsContainer);
