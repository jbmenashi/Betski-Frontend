import React, { Component } from 'react';

class ClosedTicket extends Component {

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
    return (
      <div>
        Bets: {this.showBets(this.props.bets)}<br/>
        Wager: {this.props.wager}<br/>
        Payout: {this.props.payout}<br/>
        {this.props.result === "WON" ? <h3>You won!</h3> : <h3>You lost!</h3>}
      </div>
    );
  }

}

export default ClosedTicket;
