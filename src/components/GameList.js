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
      <div className="container">
        <div className="row">
          <div className="col">
            {this.props.filteredGames.map(game => <Game {...game} key={game.id}/>)}
          </div>
        </div>
      </div>
    );
  }

}

export default connect(mapStateToProps)(GameList);
