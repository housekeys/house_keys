import React, { Component } from "react";
import {browserHistory } from "react-router";
import update from 'react-addons-update';

import Navigation from '../Navigation/Navigation';

class NewPostRoommate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roommate: {
          title: '',
          email: '',
          gender: '',
          smoker: '',
          sleep: '',
          dishes: '',
          toilet_paper: '',
          age: '',
          wallet: ''
      },
      user: {}
    };
  }

  componentWillMount() {
    if (!localStorage.getItem('token')) {
        browserHistory.push('/login');
    } else {
      let userObj = JSON.parse(window.localStorage.user);
      this.setState({user: userObj})
    }
  }

handleChange(event) {
  console.log(event.target.value)
  let newState = update(this.state, {
    roommate: {
      $merge: {
        [event.target.name]: event.target.value
      }
    }
  })
  this.setState(newState);
}

handleSubmit(event) {
  event.preventDefault();

  fetch('https://house-keys-api.herokuapp.com/roommates/new', {
    method: 'POST',
    body: JSON.stringify({
      roommate: this.state.roommate
    }),
    headers: {
      'Content-type': 'application/json'
    }
  })
  .then(() => {
    browserHistory.push('/dashboard');
  })
  .catch(() => {
  });
}


  render(){
    return(
      <div>
        <Navigation
          user={this.state.user}
          className="welcome"
        />
        <h4 className="roommate-form">Looking For A Roommate?<br/>
        Let  <span>HouseKeys</span>  Help</h4>
        <form onSubmit={this.handleSubmit.bind(this)} className="formFlex">
          <input type="text" name="title" placeholder="Title" onChange={this.handleChange.bind(this)}></input>
          <input name="email" type="text" placeholder="Email" onChange={this.handleChange.bind(this)}></input>
          <select className="drop-down-placeholder" name="gender" onChange={this.handleChange.bind(this)}>
            <option disabled selected>Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <select className="drop-down-placeholder" name="smoker" onChange={this.handleChange.bind(this)}>
            <option disabled selected>Smoker</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <select className="drop-down-placeholder" name="sleep" onChange={this.handleChange.bind(this)}>
            <option disabled selected>I Go To Bed...</option>
            <option value="Before 10pm">Before 10pm</option>
            <option value="Around 10pm">Around 10pm</option>
            <option value="After Midnight">After Midnight</option>
          </select>
          <select className="drop-down-placeholder" name="dishes" onChange={this.handleChange.bind(this)}>
            <option disabled selected>I Wash Dishes...</option>
            <option value="After every meal">After every meal</option>
            <option value="Everyday">Everyday</option>
            <option value="When the sink is full">When the sink is full</option>
            <option value="What are dishes?!">What are dishes?!</option>
          </select>
          <select className="drop-down-placeholder" name="toilet_paper" onChange={this.handleChange.bind(this)}>
            <option disabled selected>Toiler Paper...</option>
            <option value="Scotts">Scotts</option>
            <option value="Charmin">Charmin</option>
            <option value="Generic">Generic</option>
          </select>
          <select className="drop-down-placeholder" name="age" onChange={this.handleChange.bind(this)}>
            <option disabled selected>Age</option>
            <option value="21 - 30">21 - 30</option>
            <option value="31 - 40">31 - 40</option>
            <option value="41+">41+</option>
          </select>
          <select className="drop-down-placeholder" name="wallet" onChange={this.handleChange.bind(this)}>
            <option disabled selected>Desirable Monthly Rent</option>
            <option value="$800 - $1000">$800 - $1000</option>
            <option value="$1001 - $1500">$1001 - $1500</option>
            <option value="$1501 - $2000">$1501 - $2000</option>
            <option value="$2000+">$2000+</option>
          </select>
          <button href="/dashboard" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

  export default NewPostRoommate;
