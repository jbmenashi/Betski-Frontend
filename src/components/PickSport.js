import React, { Component } from 'react';
import {connect} from 'react-redux'

const mapDispatchToProps = (dispatch) => {
  return {
    selectSport: (sport) => dispatch({type: "SELECT_SPORT", payload: sport})
  }
}

class PickSport extends Component {

  render() {
    return (
      <div className="pickSport">
        <h3>Pick A Sport</h3>
        <button className="btn btn-med" id="NBAButton" onClick={() => this.props.selectSport("NBA")}>NBA</button>
        <button className="btn btn-dark btn-med" onClick={() => this.props.selectSport("NHL")}>NHL</button>
        <button className="btn btn-primary btn-med" onClick={() => this.props.selectSport("NCAAB")}>NCAAB</button>
      </div>
    );
  }

}

export default connect(null, mapDispatchToProps)(PickSport);
