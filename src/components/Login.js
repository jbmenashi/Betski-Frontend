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
    inputLogin: (event) => dispatch({type: "INPUT_LOGIN", payload: event.target.value}),
    submitLogin: (userId) => dispatch({type: "SUBMIT_LOGIN", payload: userId})
  }
}

class Login extends Component {

  setCurrentUser = (input) => {
    fetch('http://localhost:3000/api/v1/users/')
    .then(res => res.json())
    .then(data => {
      let foundUser = data.find(user => user.username === input)
      foundUser !== undefined ? this.props.submitLogin(foundUser.id) :
      fetch('http://localhost:3000/api/v1/users/', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
          'Accept':'application/json'
        },
        body: JSON.stringify({
          username: input,
          balance: 1000
        })
      })
      .then(res => res.json())
      .then(newUser => {
        this.props.submitLogin(newUser.id)
      })
    })
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.props.inputLogin} value={this.props.loginInput}/>
        <button type="submit" onClick={() => this.setCurrentUser(this.props.loginInput)}>Submit</button>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
