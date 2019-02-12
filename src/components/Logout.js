import React, { Component } from 'react';
import {connect} from 'react-redux';
import {clearUserData, clearGameData, clearTicketData, clearActiveBets, unselectBet} from '../actions/index'

const mapDispatchToProps = dispatch => {
  return {
    clearUserData: () => dispatch(clearUserData()),
    clearGameData: () => dispatch(clearGameData()),
    clearTicketData: () => dispatch(clearTicketData()),
    unselectBet: () => dispatch(unselectBet()),
    clearActiveBets: () => dispatch(clearActiveBets())
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
