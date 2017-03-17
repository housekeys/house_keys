import React, { Component } from "react";
import { Link } from "react-router";
import { Route, Router, browserHistory } from "react-router";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
        email: '',
        password: ''
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

    fetch('http://localhost:8000/users/login', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Content-type': 'application/json'
        }
    })
    .then((results) => {
      results.json().then((jwt) => {
        console.log('**',jwt.token);
        window.localStorage.setItem('token', jwt.token);
        browserHistory.push('/dashboard');
      });
    })
    .catch((err) => {
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
