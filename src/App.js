import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import './App.css';
import {connect} from 'react-redux';
import Landing from './containers/Landing';
import AccountContainer from './containers/AccountContainer'
import NewTicketContainer from './containers/NewTicketContainer'


const mapStateToProps = (state) => {
  return {
    currentUserId: state.currentUserId,
  }
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <>
            <nav>
            <Link to="/account">Account</Link>
            <Link to="/new-ticket">New Ticket</Link>
            </nav>
            <Route exact path="/" render={() => (this.props.currentUserId !== undefined ? (<Redirect to="/account"/>) : (<Landing/>))}/>
            <Route path="/account" component={AccountContainer}/>
            <Route path="/new-ticket" component={NewTicketContainer}/>
          </>
        </Router>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
