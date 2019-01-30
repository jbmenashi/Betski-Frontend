import React, { Component } from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    currentUserId: state.currentUserId,
    games: state.games
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGames: (data) => dispatch({type: "FETCH_GAMES", payload: data})
  }
}

class NewTicketContainer extends Component {
  componentDidMount() {
    fetch('http://localhost:3000/api/v1/games/')
    .then(res => res.json())
    .then(data => {
      this.props.fetchGames(data)
    })
  }

  render() {
    return (
      <div>

      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(NewTicketContainer);
