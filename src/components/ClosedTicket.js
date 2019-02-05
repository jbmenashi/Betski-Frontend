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
      <div className="col-lg-4">
        <div className="wrapper">
        {this.showBets(this.props.bets).map(element => <p>{element}</p>)}
        Wager: {this.props.wager} Units<br/>
        Payout: {this.props.payout} Units<br/>
        {this.props.result === "WON" ? <h3>You won!</h3> : <h3>You lost!</h3>}
        </div>
      </div>
    );
  }

}

export default ClosedTicket;
