import React, { Component } from 'react';
import {connect} from 'react-redux'
import {adjustBalance, unselectBet, closeTicket, clearActiveBets, resetWagerInput} from '../actions/index'

const mapStateToProps = state => {
  return {
    currentUserId: state.user.currentUserId,
    currentUserBalance: state.user.currentUserBalance,
    tickets: state.ticket.tickets,
    closedTickets: state.ticket.closedTickets
  }
}
const mapDispatchToProps = dispatch => {
  return {
    adjustBalance: (payout) => dispatch(adjustBalance(payout)),
    unselectBet: () => dispatch(unselectBet()),
    closeTicket: (index, ticket) => dispatch(closeTicket(index, ticket)),
    clearActiveBets: () => dispatch(clearActiveBets()),
    resetWagerInput: () => dispatch(resetWagerInput())
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
    this.props.resetWagerInput()
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
