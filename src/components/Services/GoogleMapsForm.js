import React, { Component } from 'react';
// import { Link } from 'react-router';

const key = 'AIzaSyDaE4S-Ud2fqGMqJLKRu2pwjsnOle0W6xY'


// API Key Porject Name is HouseKeys NOT House_Keys
class GoogleMapsForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      address: '',
      latLong: ''
    };
  }

  render() {
    let address = this.props.address
    if (!address) {
      address = 'New York'
    }
    console.log(address)
    return (
      <div>
        <iframe className={this.props.className}
          frameBorder="0"
          src={`https://www.google.com/maps/embed/v1/place?key=${key}&q=${address}`} >
        </iframe>
      </div>


    )
  }
}

export default GoogleMapsForm;
