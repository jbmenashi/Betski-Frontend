import React, { Component } from 'react';

class OpenTicket extends Component {

  showBets = (bets) => {
    let mappedBets = bets.map(bet => {
      if (bet.variety === "spread") {
        return `${bet.variety.toUpperCase()} bet on ${bet.team} at ${bet.line} for ${bet.odds} odds`
      }
      else if (bet.variety === "over_under") {
        return `${bet.variety.toUpperCase()} bet on ${bet.team} between the ${bet.away} and the ${bet.home} at ${bet.line} for ${bet.odds} odds`
      }
      else if (bet.variety === "moneyline") {
        return `${bet.variety.toUpperCase()} bet on ${bet.team} to win for ${bet.odds} odds`
      }
    })
    return mappedBets
  }

  render() {
    console.log(this.props)
    return (
      <div>
        Bets: {this.showBets(this.props.bets)}<br/>
        Wager: {this.props.wager}<br/>
        Payout: {this.props.payout}<br/>
        <button>Win</button>
        <button>Lose</button>
      </div>
    );
  }

}

export default OpenTicket;
