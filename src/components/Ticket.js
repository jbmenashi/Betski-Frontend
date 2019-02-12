import React, { Component } from 'react';
import BetList from './BetList'
import {connect} from 'react-redux'

const mapStateToProps = state => {
  return {
    wagerInput: state.ticket.wagerInput,
    currentTicketId: state.ticket.currentTicketId,
    isActiveTicket: state.ticket.isActiveTicket,
    activeBets: state.bet.activeBets,
    activeMultiplier: state.bet.activeMultiplier,
    currentUserBalance: state.user.currentUserBalance,
    currentUserId: state.user.currentUserId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    inputWager: (event) => dispatch({type: "INPUT_WAGER", payload: event.target.value}),
    removeBetFromActive: (index, divide) => dispatch({type: "REMOVE_BET_FROM_ACTIVE", payload: index, divide: divide}),
    removeTicketFromActive: () => dispatch({type: "REMOVE_TICKET_FROM_ACTIVE", payload: "test"}),
    adjustBalance: (payout) => dispatch({type: 'ADJUST_BALANCE', payload: payout}),
    unselectBet: () => dispatch({type: "UNSELECT_BET"}),
    clearActiveBets: () => dispatch({type: "CLEAR_ACTIVE_BETS"}),
    resetWagerInput: () => dispatch({type: "RESET_WAGER_INPUT"})
  }
}

class Ticket extends Component {

  removeBet = (betId) => {
    let foundBet = this.props.activeBets.find(bet => bet.id === betId)
    this.props.removeBetFromActive(this.props.activeBets.findIndex(bet => bet.id === betId), foundBet.multiplier)
    fetch(`http://localhost:3000/api/v1/bets/${betId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
  }

  calculatePayout = (wager, multiplier) => {
    return (wager * multiplier).toFixed(0)
  }

  submitTicket = (ticketId) => {
    if (this.props.activeBets.length === 0) {
      window.alert("A Ticket Must Have At Least 1 Bet")
    }
    else if (this.props.wagerInput < 1) {
      window.alert("Wager Must Be At Least 1 Unit")
    }
    else if (this.props.currentUserBalance < this.props.wagerInput) {
      window.alert("Wager Exceeds Available Units")
    }
    else {
      this.props.adjustBalance(-this.props.wagerInput)
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
          balance: parseInt(this.props.currentUserBalance - this.props.wagerInput)
        })
      })
      fetch(`http://localhost:3000/api/v1/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type':'application/json',
          'Accept':'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          wager: this.props.wagerInput,
          payout: this.calculatePayout(this.props.wagerInput, this.props.activeMultiplier),
          submitted: true
        })
      })
      .then(res => res.json())
      .then(subTicket => {
        this.props.removeTicketFromActive()
      })
      .then(window.alert("Ticket Submitted!"))
    }
  }

  removeTicket = (ticketId) => {
    this.props.activeBets.forEach(bet => this.removeBet(bet.id))
    this.props.clearActiveBets()
    this.props.removeTicketFromActive()
    fetch(`http://localhost:3000/api/v1/tickets/${ticketId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
  }

  render() {
    return (
      <div className="ticketInfo">
        <h2>Ticket</h2>
        <BetList/>
        <h5>Wager:</h5>
        <input width="20" type="number" onChange={this.props.inputWager} value={this.props.wagerInput}/><br/><br/>
        <h5>Payout (Wager + Winnings):</h5><br/>
        <h3><em id="units">{this.calculatePayout(this.props.wagerInput, this.props.activeMultiplier)}</em> Units</h3><br/>
        <button className="btn btn-success btn-med" onClick={() => this.submitTicket(this.props.currentTicketId)}>Submit Ticket</button>
        <button className="btn btn-danger btn-med" onClick={() => this.removeTicket(this.props.currentTicketId)}>Cancel Ticket</button>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Ticket);
