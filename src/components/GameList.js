import React, { Component } from 'react';
import {connect} from 'react-redux';
import Game from './Game'

const mapStateToProps = (state) => {
  return {
    filteredGames: state.filteredGames
  }
}

class GameList extends Component {

  render() {
    return (
      <div>
        {this.props.filteredGames.map(game => <Game {...game} id={game.id}/>)}
      </div>
    );
  }

}

export default connect(mapStateToProps)(GameList);
