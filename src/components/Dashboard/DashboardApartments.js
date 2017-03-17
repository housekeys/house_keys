import React, { Component } from "react";


class DashboardApartments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apartments: []
    };
  }

  componentDidMount() {
  fetch(`http://localhost:8000/apartments`, {
    method: 'GET'
  })
  .then((results) => {
    results.json().then((apartments_data) => {
      this.setState({apartments: apartments_data});
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
        {this.state.apartments.map((apartment) => {
          return(
          <div key={apartment.id} className="">
            <div>
              <h2>Title: {apartment.title}</h2>
            </div>
            <div>
              <h2>Address: {apartment.address}</h2>
            </div>
            <div>
              <h2>Rent: ${apartment.rent}</h2>
            </div>
            <div>
              <h2>Description: {apartment.description}</h2>
            </div>
            <div>
              <h2>Photo: {apartment.photo}</h2>
            </div>
          </div>
        );
        })}
    </div>
  </div>
    );
  }
}

export default DashboardApartments;
