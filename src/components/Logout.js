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
      <div>
      <button onClick={() => this.props.logout()}>Log Out</button>
      </div>
    );
  }

}

export default connect(null, mapDispatchToProps)(Logout);
