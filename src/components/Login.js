import React, { Component } from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    currentUserId: state.currentUserId,
    currentUserName: state.currentUserName,
    currentUserBalance: state.currentUserBalance,
    usernameInput: state.usernameInput,
    passwordInput: state.passwordInput
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    inputUsername: (event) => dispatch({type: "INPUT_USERNAME", payload: event.target.value}),
    inputPassword: (event) => dispatch({type: "INPUT_PASSWORD", payload: event.target.value}),
    submitLogin: (userId, userName, userBalance) => dispatch({type: "SUBMIT_LOGIN", id: userId, name: userName, balance: userBalance })
  }
}

class Login extends Component {

  setCurrentUser = (username, password) => {
    if (username.length === 0) {
      window.alert("Must Enter a Username")
    }
    else if (password.length < 4) {
      window.alert("Password Must Be At Least 4 Characters")
    }
    else {
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
        console.log(newUser)
        this.props.submitLogin(newUser.user.id, newUser.user.username, newUser.user.balance)
      })
    }
  }

  render() {
    return (
      <div id="loginInput">
        <h1>Sign Up/Log In</h1>
        <input type="text" onChange={this.props.inputUsername} value={this.props.usernameInput} placeholder="Username"/><br/>
        <input type="password" onChange={this.props.inputPassword} value={this.props.passwordInput} placeholder="Password"/><br/>
        <button type="submit" className="btn btn-med" id="submitLogin" onClick={() => this.setCurrentUser(this.props.usernameInput, this.props.passwordInput)}>Let's Go!</button>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
