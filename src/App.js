import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import './App.css';
import {connect} from 'react-redux';
import Landing from './containers/Landing';
import AccountContainer from './containers/AccountContainer'


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



class App extends Component {
  componentDidMount() {
    fetch('http://localhost:3000/api/v1/games/')
    .then(res => res.json())
    .then(data => {
      this.props.fetchGames(data)
    })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <>
            <nav>
            This is the Nav Bar
            </nav>
            <Route exact path="/" render={() => (this.props.currentUserId !== undefined ? (<Redirect to="/account"/>) : (<Landing/>))}/>
            <Route path="/account" component={AccountContainer}/>
          </>
        </Router>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
