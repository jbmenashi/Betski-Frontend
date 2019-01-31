import React, { Component } from 'react';
import {connect} from 'react-redux'

class GameList extends Component {

  render() {
    return (
      <div>
        test
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(GameList);
