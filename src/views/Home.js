import React from "react";
import "../css/Home.css";
import Wallpaper from "../components/Wallpaper";
import QuickSearch from "../components/QuickSearch";
import { fetchLocations, fetchMealTypes } from "../ApiService";
import Header from "../components/Header";




class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      locations: [],
      mealTypes: []
    };
  }

  componentDidMount() {
    sessionStorage.removeItem("mealtypeId");
    sessionStorage.removeItem("locationId");
    fetchMealTypes()
      .then((data) => {
        this.setState({ mealTypes: data.mealTypes });
      })
      .catch((err) => console.log(err));

    fetchLocations()
      .then((data) => {
        this.setState({ locations: data.locations });
      })
      .catch((err) => console.log(err));
  }


  render() {
    const { locations, mealTypes } = this.state;
    return (
      <>
        <Header headerStyle="homeHeader"/>
        <Wallpaper locationsData={locations} />
        <QuickSearch quickSearchData={mealTypes} />    
      </>
    );
  }
}

export default Home;
