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
        Hello {this.props.currentUserName}!<br/>
        Your current account balance is {this.props.currentUserBalance} units<br/>
        Click on New Ticket above to start betting!
      </div>
    );
  }

}

export default connect(mapStateToProps)(AccountDetails);
