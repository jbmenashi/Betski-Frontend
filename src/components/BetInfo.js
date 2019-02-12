import React, { Component } from 'react';
import {connect} from 'react-redux'

const mapStateToProps = state => {
  return {
    selectedOdds: state.bet.selectedOdds,
    selectedAwayTeam: state.bet.selectedAwayTeam,
    selectedHomeTeam: state.bet.selectedHomeTeam,
    selectedSpread: state.bet.selectedSpread,
    selectedTotal: state.bet.selectedTotal,
    selectedBetType: state.bet.selectedBetType,
    practiceWagerInput: state.bet.practiceWagerInput,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    inputPracticeWager: (event) => dispatch({type: "INPUT_PRACTICE_WAGER", payload: event.target.value}),
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
      info = <p>This is a Spread bet. You bet that the {this.props.selectedAwayTeam} will <span>{this.props.selectedSpread < 0 ? "win the game *or* lose than less by" : "win the game by at least"}</span> {Math.abs(this.props.selectedSpread)} points</p> :
      info = <p>This is a Spread bet. You bet that the {this.props.selectedHomeTeam} will <span>{this.props.selectedSpread > 0 ? "win the game *or* lose than less by" : "win the game by at least"}</span> {Math.abs(this.props.selectedSpread)} points</p>
    }
    else if (this.props.selectedBetType[0] === "over_under") {
      this.props.selectedBetType[1] === "A" ?
      info = <p>This is an Over/Under bet. You bet that the total points scored by both teams will be <span>at least</span> {this.props.selectedTotal}</p> :
      info = <p>This is an Over/Under bet. You bet that the total points scored by both teams will be <span>less than</span> {this.props.selectedTotal}</p>
    }
    else if (this.props.selectedBetType[0] === "moneyline") {
      this.props.selectedBetType[1] === "A" ?
      info = <p>This is a Moneyline bet. You bet that the {this.props.selectedAwayTeam} will <span>win the game</span></p> :
      info = <p>This is a Moneyline bet. You bet that the {this.props.selectedHomeTeam} will <span>win the game</span></p>
    }


    return (
      <div className="betInfo">
      {info}
      If you bet this much:<input type="number" onChange={this.props.inputPracticeWager} value={this.props.practiceWagerInput}/><br/>
      You would receive: <em id="units">{this.calculatePayout(this.props.practiceWagerInput, this.props.selectedOdds)}</em> Units
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(BetInfo);
