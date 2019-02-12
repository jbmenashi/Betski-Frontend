import React, { Component } from 'react';
import {connect} from 'react-redux'

const mapStateToProps = state => {
  return {
    selectedAwayTeam: state.bet.selectedAwayTeam,
    selectedHomeTeam: state.bet.selectedHomeTeam,
    teams: state.game.teams
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTeams: (data) => dispatch({type: "FETCH_TEAMS", payload: data})
  }
}

let foundAwayTeam
let foundHomeTeam

class MatchupInfo extends Component {

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/teams', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(data => {
      this.props.fetchTeams(data)
    })
  }

  render() {
    foundAwayTeam = this.props.teams.find(team => this.props.selectedAwayTeam.includes(team.nickname) && this.props.selectedAwayTeam.includes(team.city))
    foundHomeTeam = this.props.teams.find(team => this.props.selectedHomeTeam.includes(team.nickname) && this.props.selectedHomeTeam.includes(team.city))

    return (
      <div className="container">
        <div className="row">
          <div className="col">
          <h3 className="teamName">{`${foundAwayTeam !== undefined ? foundAwayTeam.city : "Stats"} ${foundAwayTeam !== undefined ? foundAwayTeam.nickname : "Unavailable"}`}</h3>
          <h5><em>Overall W-L:</em> {foundAwayTeam !== undefined ? foundAwayTeam.win_loss : null}</h5>
          <h5><em>Away W-L:</em> {foundAwayTeam !== undefined ? foundAwayTeam.away_win_loss : null}</h5>
          <h5><em>Last 10 Games W-L:</em> {foundAwayTeam !== undefined ? foundAwayTeam.last_ten : null}</h5>
          <h5><em>Points For:</em> {foundAwayTeam !== undefined ? foundAwayTeam.points_for : null}</h5>
          <h5><em>Points Against:</em> {foundAwayTeam !== undefined ? foundAwayTeam.points_against : null}</h5>
          <h5><em>Streak:</em> {foundAwayTeam !== undefined ? foundAwayTeam.streak : null}</h5>
          </div>
          <div className="col">
          <h3 className="teamName">{`${foundHomeTeam !== undefined ? foundHomeTeam.city : "Stats"} ${foundHomeTeam !== undefined ? foundHomeTeam.nickname : "Unavailable"}`}</h3>
          <h5><em>Overall W-L:</em> {foundHomeTeam !== undefined ? foundHomeTeam.win_loss : null}</h5>
          <h5><em>Home W-L:</em> {foundHomeTeam !== undefined ? foundHomeTeam.home_win_loss : null}</h5>
          <h5><em>Last 10 Games W-L:</em> {foundHomeTeam !== undefined ? foundHomeTeam.last_ten : null}</h5>
          <h5><em>Points For:</em> {foundHomeTeam !== undefined ? foundHomeTeam.points_for : null}</h5>
          <h5><em>Points Against:</em> {foundHomeTeam !== undefined ? foundHomeTeam.points_against : null}</h5>
          <h5><em>Streak:</em> {foundHomeTeam !== undefined ? foundHomeTeam.streak : null}</h5>
          </div>
        </div>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(MatchupInfo);
