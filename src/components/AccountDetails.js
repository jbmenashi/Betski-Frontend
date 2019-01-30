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
        Username: {this.props.currentUserName}<br/>
        Balance: {this.props.currentUserBalance}
      </div>
    );
  }

}

export default connect(mapStateToProps)(AccountDetails);
