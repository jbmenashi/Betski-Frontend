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
            <nav className="navbar navbar-expand-lg">
              <h2 className="navbar-brand">Betski</h2>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav">
                  <li className="nav-item"><Link className="nav-link" to="/account">My Account</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/new-ticket">New Ticket</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/open-tickets">Open Tickets</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/closed-tickets">Closed Tickets</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/logout">Log Out</Link></li>
                </ul>
              </div>
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
