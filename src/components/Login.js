import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

const mapStateToProps = (state) => {
  return {
    currentUserId: state.currentUserId,
    loginInput: state.loginInput
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    inputLogin: (event) => dispatch({type: "INPUT_LOGIN", payload: event.target.value})
  }
}

class Login extends Component {

  render() {
    return (
      <div>
        <input onChange={this.props.inputLogin} type="text" value={this.props.loginInput}/>
        <button>Submit</button>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
