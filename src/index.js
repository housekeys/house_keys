import React from "react";
import ReactDom from "react-dom";
import { Route, Router, browserHistory } from "react-router";

import './Style/Style.css';
import './Vendor/milligram/dist/milligram.css';

// Here we are importing the ten views
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import EditUser from './components/EditUser/EditUser';
import NewUser from './components/NewUser/NewUser';
import LandingPage from './components/LandingPage/LandingPage';
import NewProfile from './components/NewProfile/NewProfile';
import NewPostRoommate from "./components/NewPostRoommate/NewPostRoommate";
import NewPostApartment from './components/NewPostApartment/NewPostApartment';
import Restricted from './components/Restricted/Restricted'

ReactDom.render(
  <Router history={browserHistory}>
    <Route path='/' component={LandingPage} />
    <Route path='/dashboard' component={Dashboard} />
    <Route path='/login' component={Login} />
    <Route path='/restricted' component={Restricted} />
    <Route path='/user/edit' component={EditUser} />
    <Route path='/user/new' component={NewUser} />
    <Route path='/user/profile' component={NewProfile} />
    <Route path='/user/new/apartment' component={NewPostApartment} />
    <Route path='/user/new/roommate' component={NewPostRoommate} />
  </Router>
  , document.getElementById("app"));
