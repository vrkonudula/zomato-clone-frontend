import React from "react";
import "../css/Filter.css";
import FilterOptions from "../components/FilterOptions";
import Header from "../components/Header";
import RestaurantCards from "../components/RestaurantCards";
import {
  fetchMealTypeNameById,
  fetchLocationNameById,
  fetchFilteredRestaurants,
} from "../ApiService";
import queryString from "query-string";

class Filter extends React.Component {
  constructor() {
    super();
    this.state = {
      mealtypeName: ``,
      locationName: ``,
      pages: [],
      restaurants: [],
      mealtypeId: undefined,
      location: undefined,
      sort: undefined,
      locst: undefined,
      hcost: undefined,
      cusine: [],
      page: undefined
    };
  }

  makeApiCall = () => {
    let payload = {
      mealtypeId: this.state.mealtypeId,
      location: this.state.location,
      sort: this.state.sort,
      hcost: this.state.hcost,
      lcost: this.state.lcost,
      cusine: this.state.cusine,
      page: this.state.page
    }

    fetchFilteredRestaurants(payload)
      .then((data) => {
        this.setState({
          restaurants: data.restaurants,
          page: data.pageNumber
        });
        let coypArr = [];
        let i = 0;
        while (i < data.pages) {
          coypArr.push(i+1);
          i++;
        }
        this.setState({ pages: coypArr });
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    const string = queryString.parse(this.props.location.search);
    const { mealType, area } = string;
    fetchLocationNameById(area)
      .then((data) => {
        if (data) {
          this.setState({ locationName: data });
        }
      })
      .catch((err) => console.log(err));

    fetchMealTypeNameById(mealType)
      .then((data) => {
        if (data) {
          this.setState({ mealtypeName: data });
        }
      })
      .catch((err) => console.log(err));

  
    let payload = {
      mealtypeId: parseInt(mealType),
      location: !area ? undefined : parseInt(area),
    }

    fetchFilteredRestaurants(payload)
      .then((data) => {
        this.setState({
          restaurants: data.restaurants,
          mealtypeId: parseInt(mealType),
          location: !area ? undefined : parseInt(area),
          page: data.pageNumber
        });
        let coypArr = [];
        let i = 0;
        while (i < data.pages) {
          coypArr.push(i+1);
          i++;
        }
        this.setState({ pages: coypArr });
      })
      .catch((err) => console.log(err));
    
    
  }

  

  render() {
    const { restaurants, pages, cusine, page, location } = this.state;
    return (
      <>
        <Header />
        <div id="filterMain">
          <div id="filterContainer">
            <div className="filterPlace">
              {this.state.mealtypeName} Places{" "}
              {this.state.locationName !== ``
                ? `in ${this.state.locationName}`
                : ``}
            </div>
            <div className="filterContent">
              <FilterOptions filter={this} cusine={cusine} location={location}/>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <RestaurantCards filter={this} pageNumber={page} restaurants={restaurants} pages={pages} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Filter;
