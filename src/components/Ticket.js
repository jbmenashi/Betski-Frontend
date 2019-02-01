import React, { Component } from 'react';
import BetList from './BetList'
import {connect} from 'react-redux'

const mapStateToProps = state => {
  return {
    wagerInput: state.wagerInput,
    activeBets: state.activeBets,
    activeMultiplier: state.activeMultiplier,
    currentTicketId: state.currentTicketId,
    isActiveTicket: state.isActiveTicket
  }
}

const mapDispatchToProps = dispatch => {
  return {
    inputWager: (event) => dispatch({type: "INPUT_WAGER", payload: event.target.value}),
    removeBetFromActive: (index, divide) => dispatch({type: "REMOVE_BET_FROM_ACTIVE", payload: index, divide: divide})
  }
}

class Ticket extends Component {

  removeBet = (betId) => {
    let foundBet = this.props.activeBets.find(bet => bet.id === betId)
    this.props.removeBetFromActive(this.props.activeBets.findIndex(bet => bet.id === betId), foundBet.multiplier)
    fetch(`http://localhost:3000/api/v1/bets/${betId}`, {
      method: 'DELETE'
    })
  }

  calculatePayout = (wager, multiplier) => {
    return (wager * multiplier).toFixed(0)
  }

  removeTicket = (ticketId) => {
    this.props.activeBets.forEach(bet => this.removeBet(bet.id))
    fetch(`http://localhost:3000/api/v1/tickets/${ticketId}`, {
      method: 'DELETE'
    })
  }

  render() {
    return (
      <div className="ticketInfo">
      <h2>Ticket</h2>
      <BetList/>
      <strong>Wager Calculator:</strong>
      Wager:<input type="number" onChange={this.props.inputWager} value={this.props.wagerInput}/>
      Payout (Wager + Winnings):{this.calculatePayout(this.props.wagerInput, this.props.activeMultiplier)}
      <button>Submit Ticket</button>
      <button onClick={() => this.removeTicket(this.props.currentTicketId)}>Cancel Ticket</button>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Ticket);
