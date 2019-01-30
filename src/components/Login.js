import React, { Component } from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    currentUserId: state.currentUserId,
    currentUserName: state.currentUserName,
    currentUserBalance: state.currentUserBalance,
    loginInput: state.loginInput
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    inputLogin: (event) => dispatch({type: "INPUT_LOGIN", payload: event.target.value}),
    submitLogin: (userId, userName, userBalance) => dispatch({type: "SUBMIT_LOGIN", id: userId, name: userName, balance: userBalance })
  }
}

class Login extends Component {

  setCurrentUser = (input) => {
    fetch('http://localhost:3000/api/v1/users')
    .then(res => res.json())
    .then(data => {
      let foundUser = data.find(user => user.username === input)
      if (foundUser !== undefined) {
        this.props.submitLogin(foundUser.id, foundUser.username, foundUser.balance)
      }
      else {
        fetch('http://localhost:3000/api/v1/users', {
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
          this.props.submitLogin(newUser.id, newUser.username, newUser.balance)
        })
      }
    })
  }

  render() {
    return (
      <div>
        <p>Login</p>
        <input type="text" onChange={this.props.inputLogin} value={this.props.loginInput}/>
        <button type="submit" onClick={() => this.setCurrentUser(this.props.loginInput)}>Submit</button>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
