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
    unselectBet: () => dispatch({type: "UNSELECT_BET"}),
    closeTicket: (index, ticket) => dispatch({type: 'CLOSE_TICKET', index: index, ticket: ticket}),
    clearActiveBets: () => dispatch({type: "CLEAR_ACTIVE_BETS"})
  }
}

class OpenTicket extends Component {

  showBets = (bets) => {
    let mappedBets = bets.map(bet => {
      if (bet.variety === "spread") {
        return `${bet.variety.toUpperCase()} bet on the ${bet.team} at ${bet.line > 0 ? '+' + bet.line : bet.line} for ${bet.odds > 0 ? '+' + bet.odds : bet.odds} odds`
      }
      else if (bet.variety === "over_under") {
        return `${bet.variety.toUpperCase()} bet on ${bet.team} between the ${bet.away} and the ${bet.home} at ${bet.line} for ${bet.odds > 0 ? '+' + bet.odds : bet.odds} odds`
      }
      else if (bet.variety === "moneyline") {
        return `${bet.variety.toUpperCase()} bet on the ${bet.team} to win for ${bet.odds > 0 ? '+' + bet.odds : bet.odds} odds`
      }
    })
    return mappedBets
  }

  closeAndWin = ticketId => {
    fetch(`http://localhost:3000/api/v1/tickets/${ticketId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`
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
    this.props.unselectBet()
    this.props.clearActiveBets()
    fetch(`http://localhost:3000/api/v1/users/${this.props.currentUserId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`
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
        'Accept':'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`
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
      <div className="col-lg-4">
        <div className="wrapper">
          {this.showBets(this.props.bets).map(element => <p>{element}</p>)}
          Wager: {this.props.wager} Units<br/>
          Payout: {this.props.payout} Units <br/>
          <div className="winLoseButtons">
            <button className="btn btn-success btn-sm" onClick={() => this.closeAndWin(this.props.id)}>Win</button>
            <button className="btn btn-danger btn-sm" onClick={() => this.closeAndLose(this.props.id)}>Lose</button>
          </div>
        </div>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(OpenTicket);
