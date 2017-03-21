import React, { Component } from "react";
import { Link } from "react-router";

class LandingPage extends Component {
  constructor(props) {
      super(props);
  }

  componentWillMount() {
    if (localStorage.getItem('token')) {
      window.localStorage.removeItem('token');
    }
    if(localStorage.getItem('user')) {
      window.localStorage.removeItem('user');
    }
  }

  render(){
    return(
      <div className="landing-page-div">
        <div className="background-keys">
          <div className="back-key"></div>
          <div className="back-key-liftblock"></div>
          <div className="front-key"></div>
        </div>
        <div className="landing-page-links">
          <div className="landing-page-logo"><img src="/../img/House_Keys_Logo.svg" width="200px"/></div>
          <div className="lp-login link">
            <Link to='/login'>Login</Link>
          </div>
          <div className="lp-sign-up link">
            <Link to='/user/new' className="sign-up"> Sign Up</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default LandingPage;
