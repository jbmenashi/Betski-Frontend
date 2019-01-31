import React, { Component } from 'react';
import {connect} from 'react-redux'

const mapStateToProps = state => {
  return {
    currentTicketId: state.currentTicketId,
    activeBets: state.activeBets
  }
}

class BetList extends Component {

  render() {
    return (
      <div></div>
    );
  }

}

export default connect(mapStateToProps)(BetList);
