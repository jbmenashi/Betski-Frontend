import React, { Component } from 'react';
import {connect} from 'react-redux'

const mapStateToProps = state => {
  return {
    selectedOdds: state.selectedOdds,
    selectedAwayTeam: state.selectedAwayTeam,
    selectedHomeTeam: state.selectedHomeTeam,
    selectedSpread: state.selectedSpread,
    selectedTotal: state.selectedTotal,
    selectedBetType: state.selectedBetType
  }
}

class BetInfo extends Component {

  render() {
    let info;
    if (this.props.selectedBetType[0] === "spread") {
      this.props.selectedBetType[1] === "A" ?
      info = <p>This is a Spread bet. You bet that the {this.props.selectedAwayTeam} will <strong>{this.props.selectedSpread < 0 ? "win the game *or* lose than less by" : "win the game by at least"}</strong> {this.props.selectedSpread} points</p> :
      info = <p>This is a Spread bet. You bet that the {this.props.selectedHomeTeam} will <strong>{this.props.selectedSpread > 0 ? "win the game *or* lose than less by" : "win the game by at least"}</strong> {this.props.selectedSpread} points</p>
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
      </div>
    );
  }

}

export default connect(mapStateToProps)(BetInfo);
