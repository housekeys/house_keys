import React, { Component } from "react";
import update from 'react-addons-update';

import { Link, browserHistory } from "react-router";

import DashboardApartments from './DashboardApartments';
import DashboardRoommate from './DashboardRoommate';
import DashboardSmoker from './DashboardSmoker';
import Navigation from '../Navigation/Navigation';


class Dashboard extends Component {
  constructor(props) {
    super(props);

    console.log(props)

    this.state = {
      apartments: [],
      roommates: [],
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

  handleApartmentClick(event) {
    this.setState({
      apartmentClick: true,
      roommateClick: false,
    })
  }

  renderApartment() {
    if(this.state.apartmentClick) {
      return(
        <DashboardApartments />
      )
    }
  }

  handleRoommateClick() {
    this.setState({
      roommateClick: true,
      apartmentClick: false,
    })
  }

  renderRoommate() {
    if(this.state.roommateClick) {
      return(
        <DashboardRoommate />

      )
    }
  }



  render(){
    return(
      <div>
      <Navigation
        user={this.state.user}
        className="welcome"
      />
      <div className="roommate-apartment-button">
        <div className="params-view">
          <button onClick={this.handleApartmentClick.bind(this)} >
            Apartment
          </button>
        </div>
        <div className="params-view">
          <button onClick={this.handleRoommateClick.bind(this)} >
            Roommate
          </button>
        </div>
      </div>

      {this.renderApartment()}
      {this.renderRoommate()}
    </div>
    )
  }
}

export default Dashboard;
