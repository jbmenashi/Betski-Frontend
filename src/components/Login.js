import React, { Component } from 'react';
import {connect} from 'react-redux';
import {inputUsername, inputPassword, submitLogin} from '../actions/index'

const mapStateToProps = (state) => {
  return {
    currentUserId: state.user.currentUserId,
    currentUserName: state.user.currentUserName,
    currentUserBalance: state.user.currentUserBalance,
    usernameInput: state.user.usernameInput,
    passwordInput: state.user.passwordInput
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    inputUsername: (event) => dispatch(inputUsername(event)),
    inputPassword: (event) => dispatch(inputPassword(event)),
    submitLogin: (userId, userName, userBalance) => dispatch(submitLogin(userId, userName, userBalance))
  }
}

class Login extends Component {

  login = (username, password) => {
    fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(res => res.json())
    .then(loggedInUser => {
      if (loggedInUser.message) {
        window.alert("Incorrect Username/Password")
      }
      else {
        localStorage.setItem("token", loggedInUser.jwt)
        this.props.submitLogin(loggedInUser.user.id, loggedInUser.user.username, loggedInUser.user.balance)
      }
    })
  }

  signup = (username, password) => {
    fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password,
        balance: 1000
      })
    })
    .then(res => res.json())
    .then(newUser => {
      console.log(newUser);
      if (newUser.error) {
        window.alert("Please Enter a New Username + Password")
      }
      else {
        localStorage.setItem("token", newUser.jwt)
        this.props.submitLogin(newUser.user.id, newUser.user.username, newUser.user.balance)
      }
    })
  }

  render() {
    return (
      <div id="loginInput">
        <h1>Welcome!</h1>
        <input type="text" onChange={this.props.inputUsername} value={this.props.usernameInput} placeholder="Username"/><br/>
        <input type="password" onChange={this.props.inputPassword} value={this.props.passwordInput} placeholder="Password"/><br/>
        <button type="submit" className="btn btn-med" id="submitLogin" onClick={() => this.signup(this.props.usernameInput, this.props.passwordInput)}>Sign Up</button>
        <button type="submit" className="btn btn-med" id="submitLogin" onClick={() => this.login(this.props.usernameInput, this.props.passwordInput)}>Log In</button>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
