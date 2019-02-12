import React, { Component } from 'react';
import {connect} from 'react-redux'

const mapDispatchToProps = dispatch => {
  return {
    clearUserData: () => dispatch({type: "CLEAR_USER_DATA"}),
    clearGameData: () => dispatch({type: "CLEAR_GAME_DATA"}),
    clearTicketData: () => dispatch({type: "CLEAR_TICKET_DATA"}),
    unselectBet: () => dispatch({type: "UNSELECT_BET"}),
    clearActiveBets: () => dispatch({type: "CLEAR_ACTIVE_BETS"})
  }
}

class Logout extends Component {

  logout = () => {
    this.props.clearUserData()
    this.props.clearGameData()
    this.props.clearTicketData()
    this.props.unselectBet()
    this.props.clearActiveBets()
  }

  render() {
    return (
      <div id="loginContainer">
      <button className="btn btn-danger btn-lg" id="submitLogout" onClick={() => this.logout()}>Come Back Soon!</button>
      </div>
    );
  }

}

export default connect(null, mapDispatchToProps)(Logout);
