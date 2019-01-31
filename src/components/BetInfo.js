import React, { Component } from 'react';
import {connect} from 'react-redux'

const mapStateToProps = state => {
  return {
    selectedOdds: state.selectedOdds,
    selectedAwayTeam: state.selectedAwayTeam,
    selectedHomeTeam: state.selectedHomeTeam,
    selectedSpread: state.selectedSpread,
    selectedTotal: state.selectedTotal,
    selectedBetType: state.selectedBetType,
    practiceWagerInput: state.practiceWagerInput
  }
}

const mapDispatchToProps = dispatch => {
  return {
    inputPracticeWager: (event) => dispatch({type: "INPUT_PRACTICE_WAGER", payload: event.target.value})
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
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(BetInfo);
