import React, { Component } from "react";
import { Link } from "react-router";
import { browserHistory } from 'react-router';
import update from 'react-addons-update';


class NewPostApartment extends Component {
    constructor(props) {
      super(props)

      console.log(props);
      this.state = {
        apartment: {
          title: '',
          address: '',
          rent: 500,
          description: '',
          photo: '',
          user_id: 1
        }
      };
    }

  componentWillMount() {
    if (!localStorage.getItem('token')) {
        browserHistory.push('/login');
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    fetch(`http://localhost:8000/apartments/new`, {
      method: "POST",
      body: JSON.stringify({
        apartment: this.state.apartment
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

  handleChange(event) {
    let newState = update(this.state, {
      apartment: {
        $merge: {
          [event.target.name]: event.target.value
        }
      }
    });
    this.setState(newState);
  }

    render(){
      return(
        <div>
          <nav>
            <h2 className=""> Add Apartment</h2>
          </nav>
           <Link to="/dashboard">Back to Home</Link>
            <form onSubmit={this.handleSubmit.bind(this)} className="">
              <div className="">
                Title
              </div>
              <div className="">
                <input name="title" type="text" placeholder="Title" onChange={this.handleChange.bind(this)}></input>
              </div>
              <div className="">
                Address
              </div>
              <div className="">
                <input name="address" type="text" placeholder="Address" onChange={this.handleChange.bind(this)}></input>
              </div>
              <div className="">
                Rent
              </div>
              <div className="">
                <input  name="rent" type="number" placeholder="Rent" onChange={this.handleChange.bind(this)}></input>
              </div>
              <div className="">
                Description
              </div>
              <div className="">
                <input name="description" type="text" placeholder="Description" onChange={this.handleChange.bind(this)}></input>
              </div>
              <div className="">
                Photo
              </div>
              <div className="">
                <input name="photo" type="text" placeholder="Add photo" onChange={this.handleChange.bind(this)}></input>
              </div>
              <button href="/dashboard" type="submit">Submit</button>
            </form>
        </div>
      )
    }
}

export default NewPostApartment;
