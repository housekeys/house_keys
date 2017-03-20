import React, { Component } from "react";
import { browserHistory } from 'react-router';
import update from 'react-addons-update';

import GoogleMapsForm from '../Services/GoogleMapsForm';
import Navigation from '../Navigation/Navigation';



const key = process.env.API_KEY;

class NewPostApartment extends Component {
    constructor(props) {
      super(props)
      this.state = {
        apartment: {},
        latLong: '',
        user: {}
      };
    }

  componentWillMount() {
    if (!localStorage.getItem('token')) {
        browserHistory.push('/login');
    }
  }

  // Google API geoCode fetch
  searchLatLong(location) {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${key}`)
    .then(r => r.json())
    .then((data) => {
      this.setState({ latlong: `${data.results[0].geometry.location.lat} ${data.results[0].geometry.location.lng}` })
      // console.log("latitude for the boys:", newTaco.results[0].geometry.location.lat);
      // console.log("where my tudes at?:", newTaco.results[0].geometry.location.lat);
    })
  }

  // submitting form submission and GET latitude longtitude request into apartments database
  databaseSubmit() {
    fetch(`https://house-keys-api.herokuapp.com/apartments/new`, {
      method: "POST",
      body: JSON.stringify({
        apartment: this.state.apartment,
        latlong: this.state.latlong
      }),
      headers: {
        "Content-Type": 'application/json'
      }
    })
    .then(() => {
      browserHistory.push('/dashboard');
    })
    .catch((err) => {
      console.log(err);
    });
  }

  // adding form submission to this.state.apartments
  handleChange(event) {
    let newState = update(this.state, {
      apartment: {
        $merge: {
          [event.target.name]: event.target.value
        }
      },
    });
    this.searchLatLong(this.state.apartment.address)
    console.log('Lat Long:', this.state.latLong)
    this.setState(newState);
  }

  handleSubmit(location) {
    location.preventDefault();
    console.log('Lat long:', this.state.latlong)
    this.searchLatLong(this.state.apartment.address)
    this.databaseSubmit();
  }

  render(){
    return(
      <div>
        <Navigation
          user={this.state.user}
          className="welcome"
        />
        <h4 className="roommate-form">Got An Apartment? Need A Roommate?<br/>
        Let  <span>HouseKeys</span>  Help</h4>
        <div className="formFlexMap">
          <div className="aptForm">
            <form onSubmit={this.handleSubmit.bind(this)} className="aptForm">
              <input name="title" type="text" placeholder="Title" onChange={this.handleChange.bind(this)}></input>
              <input name="address" type="text" placeholder="Address" onChange={this.handleChange.bind(this)}></input>
              <input  name="rent" type="number" placeholder="Rent" onChange={this.handleChange.bind(this)}></input>
              <input name="description" type="text" placeholder="Description" onChange={this.handleChange.bind(this)}></input>
              <input name="photo" type="text" placeholder="Add photo" onChange={this.handleChange.bind(this)}></input>
              <input name="email" type="text" placeholder="Email" onChange={this.handleChange.bind(this)}></input>
              <button  type="submit">Submit</button>
            </form>
          </div>
          <div>
            <GoogleMapsForm className="formMap" address={this.state.apartment.address} />
          </div>
          <br/>
        </div>
      </div>
    )
  }
}

export default NewPostApartment;
