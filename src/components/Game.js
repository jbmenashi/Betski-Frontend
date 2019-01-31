import React, { Component } from 'react';
import {connect} from 'react-redux'

var moment = require('moment');

const mapDispatchToProps = dispatch => {
  return {
    selectBet: (gameId, odds, awayTeam, homeTeam, spread, total, betType) => {
      dispatch({
        type: "SELECT_BET",
        gameId: gameId,
        odds: odds,
        awayTeam: awayTeam,
        homeTeam: homeTeam,
        spread: spread,
        total: total,
        betType: betType
      })
    }
  }
}


class Game extends Component {

  render() {
    return (
      <div>
        <table>
        <caption>{moment(this.props.date).format('llll')}, spread: {this.props.spread}, total: {this.props.over_under}</caption>
          <tbody>
            <tr>
              <th>.</th>
              <th>Matchup</th>
              <th>Spread</th>
              <th>Over/Under</th>
              <th>Moneyline</th>
            </tr>
            <tr>
              <td><img src={this.props.away_logo} alt={this.props.away_team} width="60" height="60"/></td>
              <td>{this.props.away_team}</td>
              <td onClick={() => this.props.selectBet(this.props.id, this.props.odds[0].away_over, this.props.away_team, this.props.home_team, this.props.spread, this.props.over_under, [this.props.odds[0].line, "A"])}>{this.props.odds[0].away_over}</td>
              <td onClick={() => this.props.selectBet(this.props.id, this.props.odds[1].away_over, this.props.away_team, this.props.home_team, this.props.spread, this.props.over_under, [this.props.odds[1].line, "A"])}>{this.props.odds[1].away_over}</td>
              <td onClick={() => this.props.selectBet(this.props.id, this.props.odds[2].away_over, this.props.away_team, this.props.home_team, this.props.spread, this.props.over_under, [this.props.odds[2].line, "A"])}>{this.props.odds[2].away_over}</td>
            </tr>
            <tr>
              <td><img src={this.props.home_logo} alt={this.props.home_team} width="60" height="60"/></td>
              <td>{this.props.home_team}</td>
              <td onClick={() => this.props.selectBet(this.props.id, this.props.odds[0].home_under, this.props.away_team, this.props.home_team, this.props.spread, this.props.over_under, [this.props.odds[0].line, "H"])}>{this.props.odds[0].home_under}</td>
              <td onClick={() => this.props.selectBet(this.props.id, this.props.odds[1].home_under, this.props.away_team, this.props.home_team, this.props.spread, this.props.over_under, [this.props.odds[1].line, "H"])}>{this.props.odds[1].home_under}</td>
              <td onClick={() => this.props.selectBet(this.props.id, this.props.odds[2].home_under, this.props.away_team, this.props.home_team, this.props.spread, this.props.over_under, [this.props.odds[2].line, "H"])}>{this.props.odds[2].home_under}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

}

export default connect(null, mapDispatchToProps)(Game);
