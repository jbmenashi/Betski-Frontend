import React, { Component } from 'react';
import {connect} from 'react-redux'

const mapStateToProps = state => {
  return {
    currentUserId: state.currentUserId,
    currentUserBalance: state.currentUserBalance,
    tickets: state.tickets,
    closedTickets: state.closedTickets
  }
}
const mapDispatchToProps = dispatch => {
  return {
    adjustBalance: (payout) => dispatch({type: 'ADJUST_BALANCE', payload: payout}),
    closeTicket: (index, ticket) => dispatch({type: 'CLOSE_TICKET', index: index, ticket: ticket})
  }
}

class OpenTicket extends Component {

  showBets = (bets) => {
    bets.map(bet => {
      if (bet.variety === "spread") {
        return `${bet.variety.toUpperCase()} bet on ${bet.team} at ${bet.line} for ${bet.odds} odds`
      }
      else if (bet.variety === "over_under") {
        return `${bet.variety.toUpperCase()} bet on ${bet.team} between the ${bet.away} and the ${bet.home} at ${bet.line} for ${bet.odds} odds`
      }
      else if (bet.variety === "moneyline") {
        return `${bet.variety.toUpperCase()} bet on ${bet.team} to win for ${bet.odds} odds`
      }
    })
  }

  closeAndWin = ticketId => {
    fetch(`http://localhost:3000/api/v1/tickets/${ticketId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify({
        closed: true,
        result: "WON"
      })
    })
    .then(res => res.json())
    .then(ticket => {
      this.props.closeTicket(this.props.tickets.findIndex(ticket => ticket.id === ticketId), ticket)
    })
    this.props.adjustBalance(this.props.payout)
    fetch(`http://localhost:3000/api/v1/users/${this.props.currentUserId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify({
        balance: this.props.currentUserBalance + this.props.payout
      })
    })
  }

  closeAndLose = ticketId => {
    fetch(`http://localhost:3000/api/v1/tickets/${ticketId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify({
        closed: true,
        result: "LOST"
      })
    })
    .then(res => res.json())
    .then(ticket => {
      this.props.closeTicket(this.props.tickets.findIndex(ticket => ticket.id === ticketId), ticket)
    })
  }


  render() {
    return (
      <div>
        Bets: {this.showBets(this.props.bets)}<br/>
        Wager: {this.props.wager}<br/>
        Payout: {this.props.payout}<br/>
        <button onClick={() => this.closeAndWin(this.props.id)}>Win</button>
        <button onClick={() => this.closeAndLose(this.props.id)}>Lose</button>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(OpenTicket);
