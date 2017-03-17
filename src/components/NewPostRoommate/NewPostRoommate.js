import React, { Component } from "react";
import { Link, browserHistory } from "react-router";
import update from 'react-addons-update';


class NewPostRoommate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roommate: {
          title: '',
          gender: '',
          smoker: '',
          sleep: '',
          dishes: '',
          toilet_paper: '',
          age: '',
          wallet: '',
          user_id: ''
      }
    };
  }

  componentWillMount() {
    if (!localStorage.getItem('token')) {
        browserHistory.push('/login');
    }
  }

handleChange(event) {
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

  fetch('http://localhost:8000/roommates/new', {
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
  .catch((err) => {
  });
}

  render(){
    return(
      <div>
        <nav>
          <h2 className="">Add Roomate</h2>
        </nav>
        <Link to="/dashboard">Back to Home</Link>
        <form onSubmit={this.handleSubmit.bind(this)} className="">
          <div className="">
            Title
          </div>
          <div>
            <input name="title" placeholder="title" onChange={this.handleChange.bind(this)}></input>
          </div>
        <div>
          <h3>Gender</h3>
          <select name="gender">
            <option value='1' name="male" onChange={this.handleChange.bind(this)}>male</option>
            <option value='2' name="female" onChange={this.handleChange.bind(this)}>female</option>
          </select>
        </div>
        <div>
          <h3>Smoke?</h3>
          <select name="smoker">
            <option value='1' name="yes" onChange={this.handleChange.bind(this)}>yes</option>
            <option value='2' name="no" onChange={this.handleChange.bind(this)}>no</option>
          </select>
        </div>
        <div>
          <h3>Sleep</h3>
          <select name="Sleep">
            <option value='1' name="before 10pm" onChange={this.handleChange.bind(this)}>before 10pm</option>
            <option value='2' name="around 10pm" onChange={this.handleChange.bind(this)}>around 10pm</option>
            <option value='3' name="after midnight" onChange={this.handleChange.bind(this)}>after midnight</option>
          </select>
        </div>
        <div>
          <h3>Dishes</h3>
          <select name="Dishes">
            <option value='1' name="After every meal" onChange={this.handleChange.bind(this)}>After every meal</option>
            <option value='2' name="Everday" onChange={this.handleChange.bind(this)}>Everday</option>
            <option value='3' name="When the sink is full" onChange={this.handleChange.bind(this)}>When the sink is full</option>
            <option value='4' name="What are dishes?!" onChange={this.handleChange.bind(this)}>What are dishes?!</option>
          </select>
        </div>
        <div>
          <h3>Toilet Paper</h3>
          <select name="Toilet_paper">
            <option value='1' name="Scotts" onChange={this.handleChange.bind(this)}>Scotts</option>
            <option value='2' name="Charmin" onChange={this.handleChange.bind(this)}>Charmin</option>
            <option value='3' name="Generic" onChange={this.handleChange.bind(this)}>Generic</option>
          </select>
        </div>
        <div>
          <h3>Age</h3>
          <select name="age">
            <option value='1' name="21 -30" onChange={this.handleChange.bind(this)}>21 -30</option>
            <option value='2' name="31 - 40" onChange={this.handleChange.bind(this)}>31 - 40</option>
            <option value='3' name="41 +" onChange={this.handleChange.bind(this)}>41 +</option>
          </select>
        </div>
        <div>
          <h3>Wallet</h3>
          <select name="Wallet">
            <option value='1' name="$800 - $1000" onChange={this.handleChange.bind(this)}>$800 - $1000</option>
            <option value='2' name="$1001 - $1500" onChange={this.handleChange.bind(this)}>$1001 - $1500</option>
            <option value='3' name="$1501 - $2000" onChange={this.handleChange.bind(this)}>$1501 - $2000</option>
            <option value='4' name="$2000 +" onChange={this.handleChange.bind(this)}>$2000 +</option>
          </select>
        </div>
        <button href="/dashboard" type="submit">Submit</button>
      </form>
      </div>
    )
  }
  }

  export default NewPostRoommate;
