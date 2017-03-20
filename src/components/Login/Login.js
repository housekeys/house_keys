import React, { Component } from "react";
import {browserHistory } from "react-router";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
        email: '',
        password: '',
    };
  }

  componentWillMount() {
    if (localStorage.getItem('token')) {
        browserHistory.push('/dashboard');
    }
  }

  handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

  handleSubmit(event) {
    event.preventDefault();

    fetch('https://house-keys-api.herokuapp.com/users/login', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Content-type': 'application/json'
        }
    })
    .then((results) => {
      results.json().then((jwt) => {
        let authUser = jwt.user;
        window.localStorage.setItem('token', jwt.token);
        window.localStorage.setItem('user', JSON.stringify(authUser));
        console.log('Local User:', authUser)
        browserHistory.push('/dashboard');
      });
    })
    .catch(() => {
        alert('Not authenticated!');
    });
  }

  render(){
    return(
      <div id="login-page-div">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input placeholder="Email" name='email' type="email" onChange={this.handleChange.bind(this)}></input>
          <input placeholder="Password" name="password" type="password" onChange={this.handleChange.bind(this)}></input>
          <input type="submit"></input>
        </form>
      </div>
    )
  }
}

export default Login;
