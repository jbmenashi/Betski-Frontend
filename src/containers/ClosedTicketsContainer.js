import React, { Component } from 'react';
import {connect} from 'react-redux';
import ClosedTicket from '../components/ClosedTicket'

const mapStateToProps = state => {
  return {
    tickets: state.tickets,
    currentUserId: state.currentUserId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTickets: (tickets) => dispatch({type: "FETCH_TICKETS", payload: tickets})
  }
}

class ClosedTicketsContainer extends Component {

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
      <div id="ClosedTicketsContainer" className="container">
        <h2>Closed Tickets</h2>
        <div className="row no-gutter">
          {this.props.tickets.filter(ticket => ticket.submitted === true && ticket.closed === true).map(ticket => <ClosedTicket {...ticket} key={ticket.id}/>)}
        </div>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(ClosedTicketsContainer);
