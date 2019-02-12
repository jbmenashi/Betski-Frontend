import React, { Component } from 'react';
import {connect} from 'react-redux';
import Bet from './Bet.js'

const mapStateToProps = state => {
  return {
    currentTicketId: state.ticket.currentTicketId,
    activeBets: state.bet.activeBets
  }
}

class BetList extends Component {

  render() {
    return (
      <div className="betList">
        {this.props.activeBets.map(bet => <Bet {...bet} key={bet.id}/>)}
      </div>
    );
  }

}

export default connect(mapStateToProps)(BetList);
