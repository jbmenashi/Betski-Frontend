import React, { Component } from 'react';
import BetList from './BetList'
import {connect} from 'react-redux'

const mapStateToProps = state => {
  return {
    wagerInput: state.wagerInput,
    activeMultiplier: state.activeMultiplier
  }
}

const mapDispatchToProps = dispatch => {
  return {
    inputWager: (event) => dispatch({type: "INPUT_WAGER", payload: event.target.value})
  }
}

class TicketInfo extends Component {

  calculatePayout = (wager, multiplier) => {
    return (wager * multiplier).toFixed(0)
  }

  render() {
    return (
      <div className="ticketInfo">
      <h2>New Ticket</h2>
      <BetList/>
      <strong>Wager Calculator:</strong>
      If you bet this much:<input type="number" onChange={this.props.inputWager} value={this.props.wagerInput}/>
      You would receive: {this.calculatePayout(this.props.wagerInput, this.props.activeMultiplier)}
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(TicketInfo);
