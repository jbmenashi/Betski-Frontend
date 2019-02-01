import React, { Component } from 'react';
import {connect} from 'react-redux';
import Bet from './Bet.js'

const mapStateToProps = state => {
  return {
    currentTicketId: state.currentTicketId,
    activeBets: state.activeBets
  }
}

class BetList extends Component {

  render() {
    return (
      <div>
        {this.props.activeBets.map(bet => <Bet {...bet} key={bet.id}/>)}
      </div>
    );
  }

}

export default connect(mapStateToProps)(BetList);
