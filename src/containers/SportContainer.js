import React, { Component } from 'react';
import {connect} from 'react-redux';
import GameList from '../components/GameList';
import BetInfo from '../components/BetInfo';

const mapStateToProps = (state) => {
  return {
    games: state.games,
    filteredGames: state.filteredGames,
    isBetSelected: state.isBetSelected
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectSport: (sport) => dispatch({type: "SELECT_SPORT", payload: sport})
  }
}

class SportContainer extends Component {

  render() {
    return (
      <div>
        <img src="https://s3.us-east-2.amazonaws.com/betski-images/basketball.png" alt="NBA" width="150" height="150" onClick={() => this.props.selectSport("NBA")}/>
        <img src="https://s3.us-east-2.amazonaws.com/betski-images/hockey.jpg" alt="NHL" width="150" height="150" onClick={() => this.props.selectSport("NHL")}/>
        {this.props.filteredGames.length > 0 ? <GameList/> : <></>}
        {this.props.isBetSelected ? <BetInfo/> : <></>}
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(SportContainer);
