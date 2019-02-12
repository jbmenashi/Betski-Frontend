import React, { Component } from 'react';
import {connect} from 'react-redux'

const mapDispatchToProps = (dispatch) => {
  return {
    selectSport: (sport) => dispatch({type: "SELECT_SPORT", payload: sport}),
    unselectBet: () => dispatch({type: "UNSELECT_BET"})
  }
}

class PickSport extends Component {

  selectSportAndUnselectBet = (sport) => {
    this.props.selectSport(sport);
    this.props.unselectBet()
  }

  render() {
    return (
      <div className="pickSport">
        <h3>Pick A Sport</h3>
        <button className="btn btn-med" id="NBAButton" onClick={() => this.selectSportAndUnselectBet("NBA")}>NBA</button>
        <button className="btn btn-dark btn-med" onClick={() => this.selectSportAndUnselectBet("NHL")}>NHL</button>
        <button className="btn btn-primary btn-med" onClick={() => this.selectSportAndUnselectBet("NCAAB")}>NCAAB</button>
      </div>
    );
  }

}

export default connect(null, mapDispatchToProps)(PickSport);
