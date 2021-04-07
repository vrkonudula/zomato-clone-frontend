import React from "react";
import "../css/Home.css";
import { fetchRestaurantsByLocationId } from "../ApiService";
import { StrikethroughS } from "@material-ui/icons";
import { Link } from "react-router-dom";

class Wallpaper extends React.Component {
  constructor() {
    super();
    this.state = {
      locationId: 0,
      restaurantsByLocation: [],
      searchedRestaurants: [],
    };
  }

  handleChange = (event) => {
    const locationId = event.target.value;
    if (locationId !== 0) {
      sessionStorage.setItem("locationId", locationId);
      this.setState({ searchedRestaurants: [] });
      fetchRestaurantsByLocationId(locationId)
        .then((data) => {
          this.setState({ restaurantsByLocation: data });
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    const { restaurantsByLocation, searchedRestaurants } = this.state;
    const { locationsData } = this.props;
    const displayRestaurants = (event) => {
      const searchString = event.target.value.toLowerCase();
      const tempSearch = restaurantsByLocation.filter((item) => {
        if (!searchString) return null;
        console.log(item.name);
        console.log(item.city);
        return item.name.toLowerCase().includes(searchString);
      });
      this.setState({ searchedRestaurants: tempSearch });
    };
    return (
      <>
        <div className="wallpaper">
          <img src="assets/wallpaper.png" alt="wallpaper" />
        </div>
        <div className="logoContainer">
          <div className="logo">
            <p>e!</p>
          </div>
        </div>
        <div className="heading">
          Find the best restaurants, cafés, and bars
        </div>
        <div className="location">
          <div>
            <select
              className="location-dropdown-home"
              onChange={(e) => this.handleChange(e)}
            >
              <option value="0">Please choose a location</option>
              {locationsData.map((item) => {
                return (
                  <option value={item.location_id} key={item.location_id}>
                    {`${item.name}, ${item.city}`}
                  </option>
                );
              })}
            </select>
          </div>
          <div id="searchComponent">
            <div id="searchBar">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
                id="searchIcon"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
              <input
                type="text"
                className="search"
                placeholder="Search a restaurant"
                onKeyUp={(e) => displayRestaurants(e)}
              />
            </div>
            <div>
              {searchedRestaurants.map((item) => {
                return (
                  <div key={item._id} className="searchContainer">
                    <div className="search-content">
                      <div className="search-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <Link to={`/restaurant/details?id=${item._id}`}>
                        <div className="search-restaurant-name">
                        <div>{item.name}</div>
                        <div className="search-city-name">{item.locality}, {item.city}</div>
                      </div>
                      </Link>
                    </div>
                  </div>
                );
              })}

            </div>    
          </div>
        </div>
      </>
    );
  }
}

export default Wallpaper;
