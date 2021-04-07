import React from "react";
import Header from "../components/Header";
import RestaurantPageImage from "../components/RestaurantPageImage";
import RestaurantPageDetails from "../components/RestaurantPageDetails";
import "../css/RestaurantDetails.css";
import { fetchRestaurantById } from "../ApiService";
import queryString from "query-string";


class RestaurantDetails extends React.Component {

  constructor() {
    super();
    this.state = {
      restaurant: []
    }
  }

  componentDidMount() {
    const string = queryString.parse(this.props.location.search);
    fetchRestaurantById(string.id)
      .then((data) => this.setState({ restaurant: data }))
      .catch((err) => console.log(err));
  }

  render() {
    const { restaurant } = this.state;
    return (
      <>
        <Header />
        <div id="main">
          <div id="content">
            <RestaurantPageImage restaurant={restaurant}/>
            <RestaurantPageDetails restaurant={restaurant}/>
          </div>
        </div>
      </>
    );
  }
}

export default RestaurantDetails;
