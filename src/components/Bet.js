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
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
  }

  render() {
    let info;
    if (this.props.variety === "spread") {
      info = `${this.props.variety.toUpperCase()} bet on the ${this.props.team} at ${this.props.line} for ${this.props.odds > 0 ? '+' + this.props.odds : this.props.odds} odds`
    }
    else if (this.props.variety === "over_under") {
      info = `${this.props.variety.toUpperCase()} bet on the ${this.props.team} between the ${this.props.game.away_team} and the ${this.props.game.home_team} at ${this.props.line} for ${this.props.odds > 0 ? '+' + this.props.odds : this.props.odds} odds`
    }
    else if (this.props.variety === "moneyline") {
      info = `${this.props.variety.toUpperCase()} bet on the ${this.props.team} to win for ${this.props.odds > 0 ? '+' + this.props.odds : this.props.odds} odds`
    }

    return (
      <div className="bet">
        <h6>{info}</h6>
        <button className="btn btn-danger btn-sm" onClick={() => this.removeBet(this.props.id)}>Remove Bet</button>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Bet);
