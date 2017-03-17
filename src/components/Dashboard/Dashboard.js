import React, { Component } from "react";
import update from 'react-addons-update';

import { Link, browserHistory } from "react-router";

import DashboardApartments from './DashboardApartments';
import DashboardRoommate from './DashboardRoommate';
import DashboardSmoker from './DashboardSmoker';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apartments: [],
      roommates: [],
    };
  }

  componentWillMount() {
    if (!localStorage.getItem('token')) {
        browserHistory.push('/login');
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
      // smokerClick: false
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
        <nav>
          <h1>{this.state.message}</h1>
          <h1> Welcome, Rachel</h1>
        </nav>
        <Link to="user/new/apartment">New Apartment Post</Link><br />
        <Link to="user/new/roommate">New Roomate Post</Link><br />
      <div>
        <button onClick={this.handleApartmentClick.bind(this)} >
          Apartment
        </button>
      </div>

      <div>
        <button onClick={this.handleRoommateClick.bind(this)} >
          Roommate
        </button>
      </div>
      {this.renderApartment()}
      {this.renderRoommate()}
    </div>
    )
  }
}

export default Dashboard;
