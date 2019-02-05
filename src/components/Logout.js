import React, { Component } from 'react';
import {connect} from 'react-redux'

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch({type: "LOGOUT"})
  }
}

class Logout extends Component {

  render() {
    return (
      <div id="loginContainer">
      <button className="btn btn-danger btn-lg" id="submitLogout" onClick={() => this.props.logout()}>Come Back Soon!</button>
      </div>
    );
  }

}

export default connect(null, mapDispatchToProps)(Logout);
