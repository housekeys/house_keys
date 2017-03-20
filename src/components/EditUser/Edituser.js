import React, { Component } from "react";

class EditUser extends Component {
    constructor(props) {
      super(props)
    }

    render(){
      return(
        <div>
          <nav>
            <h1>Edit</h1>
            <input placeholder="name"></input>
            <input placeholder="email"></input>
            <input placeholder="username"></input>
            <input placeholder="password"></input>
            <button href="/dashboard" type="submit">Submit</button>
          </nav>
        </div>
      )
    }
}

export default EditUser;
