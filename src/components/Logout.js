import React, { Component } from 'react';
import {connect} from 'react-redux'

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch({type: "LOGOUT"}),
    unselectBet: () => dispatch({type: "UNSELECT_BET"})
  }
}

class Logout extends Component {

  takeLogoutActions = () => {
    this.props.logout();
    this.props.unselectBet()
  }

  render() {
    return (
      <div id="loginContainer">
      <button className="btn btn-danger btn-lg" id="submitLogout" onClick={() => this.takeLogoutActions()}>Come Back Soon!</button>
      </div>
    );
  }

}

export default connect(null, mapDispatchToProps)(Logout);
