import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import './App.css';
import {connect} from 'react-redux';
import Landing from './containers/Landing';
import AccountContainer from './containers/AccountContainer'
import NewTicketContainer from './containers/NewTicketContainer'
import OpenTicketsContainer from './containers/OpenTicketsContainer'
import ClosedTicketsContainer from './containers/ClosedTicketsContainer'
import Logout from './components/Logout'

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
            <Link to="/open-tickets">Open Tickets</Link>
            <Link to="/closed-tickets">Closed Tickets</Link>
            <Link to="/logout">Log Out</Link>
            </nav>
            <Route exact path="/" render={() => (this.props.currentUserId !== undefined ? (<Redirect to="/account"/>) : (<Landing/>))}/>
            <Route path="/account" component={AccountContainer}/>
            <Route path="/new-ticket" component={NewTicketContainer}/>
            <Route path="/open-tickets" component={OpenTicketsContainer}/>
            <Route path='/closed-tickets' component={ClosedTicketsContainer}/>
            <Route path='/logout' render={() => (this.props.currentUserId !== undefined ? (<Logout/>) : (<Redirect to="/"/>))}/>
          </>
        </Router>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
