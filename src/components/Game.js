import React, { Component } from 'react';
import {connect} from 'react-redux'

var moment = require('moment');

const mapDispatchToProps = dispatch => {
  return {
    selectBet: (gameId, odds, awayTeam, homeTeam, spread, total, betType, betForPost) => {
      dispatch({
        type: "SELECT_BET",
        gameId: gameId,
        odds: odds,
        awayTeam: awayTeam,
        homeTeam: homeTeam,
        spread: spread,
        total: total,
        betType: betType,
        betForPost: betForPost
      })
    }
  }
}


class Game extends Component {

  awaySpread = (spread) => {
    if (spread < 0) {
      return `+${Math.abs(spread)}`
    } else {
      return -Math.abs(spread)
    }
  }

  homeSpread = (spread) => {
    if (spread < 0) {
      return spread
    } else {
      return `+${Math.abs(spread)}`
    }
  }

  render() {
    return (
      <div>
        <table className="table">
        <caption>{moment(this.props.date).format('llll')}, spread: {this.homeSpread(this.props.spread)}, total: {this.props.over_under}</caption>
        <thead className="thead-dark">
            <tr>
              <th scope="col">{this.props.sport}</th>
              <th scope="col">Matchup</th>
              <th scope="col">Spread</th>
              <th scope="col">Over/Under</th>
              <th scope="col">Moneyline</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><img src={this.props.away_logo} alt={this.props.away_team} width="60" height="60"/></td>
              <td>{this.props.away_team}</td>

              <td><button type="button" className="btn btn-outline-dark" data-toggle="modal" data-target="#betInfoModal" onClick={() => this.props.selectBet(this.props.id, this.props.odds[0].away_over, this.props.away_team, this.props.home_team, this.props.spread, this.props.over_under, [this.props.odds[0].line, "A"], [this.props.away_team, this.props.odds[0].line, this.awaySpread(this.props.spread), this.props.odds[0].away_over, this.props.away_team, this.props.home_team])}>{this.props.odds[0].away_over > 0 ? '+' + this.props.odds[0].away_over : this.props.odds[0].away_over}</button></td>

              <td><button type="button" className="btn btn-outline-dark" data-toggle="modal" data-target="#betInfoModal" onClick={() => this.props.selectBet(this.props.id, this.props.odds[1].away_over, this.props.away_team, this.props.home_team, this.props.spread, this.props.over_under, [this.props.odds[1].line, "A"], ["the Over", this.props.odds[1].line, this.props.over_under, this.props.odds[1].away_over, this.props.away_team, this.props.home_team])}>{this.props.odds[1].away_over > 0 ? '+' + this.props.odds[1].away_over : this.props.odds[1].away_over}</button></td>

              <td><button type="button" className="btn btn-outline-dark" data-toggle="modal" data-target="#betInfoModal" onClick={() => this.props.selectBet(this.props.id, this.props.odds[2].away_over, this.props.away_team, this.props.home_team, this.props.spread, this.props.over_under, [this.props.odds[2].line, "A"], [this.props.away_team, this.props.odds[2].line, 0, this.props.odds[2].away_over, this.props.away_team, this.props.home_team])}>{this.props.odds[2].away_over > 0 ? '+' + this.props.odds[2].away_over : this.props.odds[2].away_over}</button></td>
            </tr>
            <tr>
              <td><img src={this.props.home_logo} alt={this.props.home_team} width="60" height="60"/></td>
              <td>{this.props.home_team}</td>

              <td><button type="button" className="btn btn-outline-dark" data-toggle="modal" data-target="#betInfoModal" onClick={() => this.props.selectBet(this.props.id, this.props.odds[0].home_under, this.props.away_team, this.props.home_team, this.props.spread, this.props.over_under, [this.props.odds[0].line, "H"], [this.props.home_team, this.props.odds[0].line, this.homeSpread(this.props.spread), this.props.odds[0].home_under, this.props.away_team, this.props.home_team])}>{this.props.odds[0].home_under > 0 ? '+' + this.props.odds[0].home_under : this.props.odds[0].home_under}</button></td>

              <td><button type="button" className="btn btn-outline-dark" data-toggle="modal" data-target="#betInfoModal" onClick={() => this.props.selectBet(this.props.id, this.props.odds[1].home_under, this.props.away_team, this.props.home_team, this.props.spread, this.props.over_under, [this.props.odds[1].line, "H"], ["the Under", this.props.odds[1].line, this.props.over_under, this.props.odds[1].home_under, this.props.away_team, this.props.home_team])}>{this.props.odds[1].home_under > 0 ? '+' + this.props.odds[1].home_under : this.props.odds[1].home_under}</button></td>

              <td><button type="button" className="btn btn-outline-dark" data-toggle="modal" data-target="#betInfoModal" onClick={() => this.props.selectBet(this.props.id, this.props.odds[2].home_under, this.props.away_team, this.props.home_team, this.props.spread, this.props.over_under, [this.props.odds[2].line, "H"], [this.props.home_team, this.props.odds[2].line, 0, this.props.odds[2].home_under, this.props.away_team, this.props.home_team])}>{this.props.odds[2].home_under > 0 ? '+' + this.props.odds[2].home_under : this.props.odds[2].home_under}</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

}

export default connect(null, mapDispatchToProps)(Game);
