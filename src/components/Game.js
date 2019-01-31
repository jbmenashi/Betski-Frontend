import React, { Component } from 'react';
var moment = require('moment')

class Game extends Component {

  render() {
    return (
      <div>
        <table>
        <caption>{moment(this.props.date).format('LLLL')}, {this.props.spread}, total: {this.props.over_under}</caption>
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
              <td>{this.props.odds[0].away_over}</td>
              <td>{this.props.odds[1].away_over}</td>
              <td>{this.props.odds[2].away_over}</td>
            </tr>
            <tr>
              <td><img src={this.props.home_logo} alt={this.props.home_team} width="60" height="60"/></td>
              <td>{this.props.home_team}</td>
              <td>{this.props.odds[0].home_under}</td>
              <td>{this.props.odds[1].home_under}</td>
              <td>{this.props.odds[2].home_under}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

}

export default Game;
