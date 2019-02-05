import React, { Component } from 'react';
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
  return {
    currentUserName: state.currentUserName,
    currentUserBalance: state.currentUserBalance
  }
}

class AccountDetails extends Component {

  render() {
    return (
      <div>
        <h1>Hello {this.props.currentUserName}!</h1><br/>
        <h3>Your current account balance is <em id="units">{this.props.currentUserBalance}</em> units</h3><br/>
        <h5>Click on New Ticket above to start betting!</h5>
      </div>
    );
  }

}

export default connect(mapStateToProps)(AccountDetails);
