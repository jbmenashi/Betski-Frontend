import React, { Component } from 'react';
import {connect} from 'react-redux'

const mapStateToProps = state => {
  return {
    currentUserId: state.currentUserId,
    currentGameId: state.currentGameId,
    currentTicketId: state.currentTicketId,
    selectedOdds: state.selectedOdds,
    selectedAwayTeam: state.selectedAwayTeam,
    selectedHomeTeam: state.selectedHomeTeam,
    selectedSpread: state.selectedSpread,
    selectedTotal: state.selectedTotal,
    selectedBetType: state.selectedBetType,
    practiceWagerInput: state.practiceWagerInput,
    isActiveTicket: state.isActiveTicket,
    activeBets: state.activeBets
  }
}

const mapDispatchToProps = dispatch => {
  return {
    inputPracticeWager: (event) => dispatch({type: "INPUT_PRACTICE_WAGER", payload: event.target.value}),
    setCurrentTicket: (ticketId) => dispatch({type: "SET_CURRENT_TICKET", payload: ticketId}),
    pushActiveBet: (bet) => dispatch({type: "PUSH_BET_TO_ACTIVE_BETS", payload: bet})
  }
}

class BetInfo extends Component {

  calculatePayout = (wager, odds) => {
    if (odds > 0) {
      return (wager * ((Math.abs(odds) + 100) / 100)).toFixed(0)
    }
    else {
      return (wager * ((Math.abs(odds) + 100) / Math.abs(odds))).toFixed(0)
    }
  }

  addBetToTicket = () => {
    !this.props.isActiveTicket ?
    fetch('http://localhost:3000/api/v1/tickets', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify({
        user_id: this.props.currentUserId,
        wager: 0,
        payout: 0,
        submitted: false,
        closed: false
      })
    })
    .then(res => res.json())
    .then(newTicket => {
      this.props.setCurrentTicket(newTicket.id)
      fetch('http://localhost:3000/api/v1/bets', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
          'Accept':'application/json'
        },
        body: JSON.stringify({
          game_id: this.props.currentGameId,
          ticket_id: this.props.currentTicketId,
          multiplier: this.props.selectedOdds > 0 ? ((Math.abs(this.props.selectedOdds) + 100) / 100) : ((Math.abs(this.props.selectedOdds) + 100) / Math.abs(this.props.selectedOdds))
        })
      })
      .then(res => res.json())
      .then(bet => this.props.pushActiveBet(bet))
    }) :
    fetch('http://localhost:3000/api/v1/bets', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify({
        game_id: this.props.currentGameId,
        ticket_id: this.props.currentTicketId,
        multiplier: this.props.selectedOdds > 0 ? ((Math.abs(this.props.selectedOdds) + 100) / 100) : ((Math.abs(this.props.selectedOdds) + 100) / Math.abs(this.props.selectedOdds))
      })
    })
    .then(res => res.json())
    .then(bet => this.props.pushActiveBet(bet))
  }

  render() {
    let info;
    if (this.props.selectedBetType[0] === "spread") {
      this.props.selectedBetType[1] === "A" ?
      info = <p>This is a Spread bet. You bet that the {this.props.selectedAwayTeam} will <strong>{this.props.selectedSpread < 0 ? "win the game *or* lose than less by" : "win the game by at least"}</strong> {Math.abs(this.props.selectedSpread)} points</p> :
      info = <p>This is a Spread bet. You bet that the {this.props.selectedHomeTeam} will <strong>{this.props.selectedSpread > 0 ? "win the game *or* lose than less by" : "win the game by at least"}</strong> {Math.abs(this.props.selectedSpread)} points</p>
    }
    else if (this.props.selectedBetType[0] === "over_under") {
      this.props.selectedBetType[1] === "A" ?
      info = <p>This is an Over/Under bet. You bet that the total points scored by both teams will be <strong>at least</strong> {this.props.selectedTotal}</p> :
      info = <p>This is an Over/Under bet. You bet that the total points scored by both teams will be <strong>less than</strong> {this.props.selectedTotal}</p>
    }
    else {
      this.props.selectedBetType[1] === "A" ?
      info = <p>This is a Moneyline bet. You bet that the {this.props.selectedAwayTeam} will <strong>win the game</strong></p> :
      info = <p>This is a Moneyline bet. You bet that the {this.props.selectedHomeTeam} will <strong>win the game</strong></p>
    }


    return (
      <div className="betInfo">
      {info}
      <strong>Wager Calculator:</strong>
      If you bet this much:<input type="number" onChange={this.props.inputPracticeWager} value={this.props.practiceWagerInput}/>
      You would receive: {this.calculatePayout(this.props.practiceWagerInput, this.props.selectedOdds)}
      <button onClick={this.addBetToTicket}>Add Bet to Ticket</button>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(BetInfo);
