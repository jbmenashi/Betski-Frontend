import React, { Component } from 'react';
import {connect} from 'react-redux'

const mapStateToProps = state => {
  return {
    activeBets: state.activeBets
  }
}
const mapDispatchToProps = dispatch => {
  return {
    removeBetFromActive: (index, divide) => dispatch({type: "REMOVE_BET_FROM_ACTIVE", payload: index, divide: divide})
  }
}

class Bet extends Component {

  removeBet = (betId) => {
    let foundBet = this.props.activeBets.find(bet => bet.id === betId)
    this.props.removeBetFromActive(this.props.activeBets.findIndex(bet => bet.id === betId), foundBet.multiplier)
    fetch(`http://localhost:3000/api/v1/bets/${betId}`, {
      method: 'DELETE'
    })
  }

  render() {
    let info;
    if (this.props.variety === "spread" || this.props.variety === "over_under") {
      info = `${this.props.variety.toUpperCase()} bet on ${this.props.team} at ${this.props.line} for ${this.props.odds} odds`
    }
    else if (this.props.variety === "moneyline") {
      info = `${this.props.variety.toUpperCase()} bet on ${this.props.team} to win for ${this.props.odds} odds`
    }

    return (
      <div>
        {info}
        <button onClick={() => this.removeBet(this.props.id)}>Remove Bet</button>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Bet);
