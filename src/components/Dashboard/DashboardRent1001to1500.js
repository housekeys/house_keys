import React, { Component } from "react";

class DashboardRent1001to1500 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roommates: []
    };
  }

  componentDidMount() {
  fetch(`https://house-keys-api.herokuapp.com/roommates/rent1001to1500`, {
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
        <div className="roommateContainer">
           {this.state.roommates.map((roommate) => {
             console.log(roommate.id);
             return(
               <div key={roommate.id} className="roommateCard">
                 <h4>{roommate.title}</h4>
                 <div><strong>Gender</strong></div>
                 <div>{roommate.gender}</div>
                 <div><strong>Smoker</strong></div>
                 <div>{roommate.smoker}</div>
                 <div><strong>Sleeping Patterns</strong></div>
                 <div>{roommate.sleep}</div>
                 <div><strong>Dish-Washing Habits</strong></div>
                 <div>{roommate.dishes}</div>
                 <div><strong>Toiler Paper</strong></div>
                 <div>{roommate.toilet_paper}</div>
                 <div><strong>Age</strong></div>
                 <div>{roommate.age}</div>
                 <div><strong>Wallet</strong></div>
                 <div>{roommate.wallet}</div>
                 <div><a href={"mailto:" + roommate.email}>Email</a></div>
                 <br/>
               </div>
             );
           })}
       </div>
  </div>
    );
  }
}

export default DashboardRent1001to1500;
