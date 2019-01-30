import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
  return {
    games: state.games
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGames: (data) => dispatch({type: "FETCH_GAMES", payload: data})
  }
}



class App extends Component {
  componentDidMount() {
    fetch('http://localhost:3000/api/v1/games/')
    .then(res => res.json())
    .then(data => {
      this.props.fetchGames(data)
    })
  }

  render() {
    console.log(this.props.games);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
