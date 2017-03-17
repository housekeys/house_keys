import React, { Component } from "react";

class DashboardAge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roommates: []
    };
  }

  componentDidMount() {
  fetch(`http://localhost:8000/roommates`, {
    method: 'GET'
  })
  .then((results) => {
    results.json().then((roommates_data) => {
      this.setState({roommates: roommates_data});
    });
  })
  .catch((err) => {
    console.log(err);
  });
}

  render(){
    return(
      <div>
      <div className="container">
         {this.state.roommates.map((roommate) => {
          console.log(roommate.id);
          return(
          <div key={roommate.id} className="">
            <div>
              <h2>Age:{roommate.age}</h2>
            </div>
        </div>
         );
        })}
    </div>
  </div>
    );
  }
}

export default DashboardAge;
