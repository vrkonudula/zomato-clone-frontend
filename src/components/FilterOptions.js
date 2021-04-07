import React from "react";
import "../css/FilterOptions.css";
import { fetchLocations } from "../ApiService";

class FilterOptions extends React.Component {
  constructor() {
    super();
    this.state = {
      dropdown: "unselected-dropdown",
      locations: []
    };
  }

  componentDidMount() {
    fetchLocations()
      .then((data) => {
        this.setState({ locations: data.locations });
      })
      .catch((err) => console.log(err));
  }

  handleDropdown() {
    if (this.state.dropdown === "unselected-dropdown") {
      this.setState({ dropdown: "selected-dropdown" });
    } else {
      this.setState({ dropdown: "unselected-dropdown" });
    }
  }

  render() {
    let { filter, cusine } = this.props 
    let { locations } = this.state    
    let handleSort = async (sortValue) => {
      await filter.setState({ sort: sortValue })
      filter.makeApiCall();
    }

    let handlePrice = async (lcost, hcost) => {
      await filter.setState({ lcost: lcost, hcost: hcost })
      filter.makeApiCall();
    }

    let handleCusine = async (e, id) => {
      const index = cusine.indexOf(id);
      if (index === -1) {
        cusine.push(id);
      }
      else {
        cusine.splice(index, 1);
      }
      await filter.setState({ cusine: cusine });
      await filter.makeApiCall();
    }

    let handleLocation = async (e) => {
      const locationId = e.target.value;
      if (locationId !== 0) {
        await filter.setState({ location: parseInt(locationId) });
        await filter.makeApiCall();
      }
    }


    return (
      <>
        <div className="filter-dropdown" onClick={() => this.handleDropdown()}>
          <div className="filter-dropdown-text">
            <div>Filter / Sort</div>
            <div style={{"position":"relative","left":"-20px","top":"0"}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-down"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className={`filters ${this.state.dropdown}`}>
          <div className="filter-text">Filters</div>
          <div className="select-location">Select Location</div>
          <select className="location-dropdown-filter" onChange={(e) => handleLocation(e)}>
            <option value="0">Select a location</option>
            {locations.map((item) => {
                return (
                  <option value={item.location_id} key={item.location_id}>
                    {`${item.name}, ${item.city}`}
                  </option>
                );
              })}
          </select>
          <div className="options">
            <div className="cusine-text">Cusine</div>
            <div className="optionsContainer">
              <div className="option">
                <input type="checkbox" value="North Indian" onChange={(e) => handleCusine(e,1)}/>
                <span className="option-text">North Indian</span>
              </div>
              <div className="option">
                <input type="checkbox" value="South Indian" onChange={(e) => handleCusine(e,2)}/>
                <span className="option-text">South Indian</span>
              </div>
              <div className="option">
                <input type="checkbox" value="Chinese" onChange={(e) => handleCusine(e,3)}/>
                <span className="option-text">Chinese</span>
              </div>
              <div className="option">
                <input type="checkbox" value="Fast Food" onChange={(e) => handleCusine(e,4)}/>
                <span className="option-text">Fast Food</span>
              </div>
              <div className="option">
                <input type="checkbox" value="Street Food" onChange={(e) => handleCusine(e,5)}/>
                <span className="option-text">Street Food</span>
              </div>
            </div>
          </div>
          <div className="options">
            <div className="cusine-text">Cost For Two</div>
            <div className="optionsContainer">
              <div className="option">
                <input type="radio" name="cost" onClick={() => handlePrice(1,500)}/>
                <span className="option-text">Less than &#8377;500</span>
              </div>
              <div className="option">
                <input type="radio" name="cost" onClick={() => handlePrice(500,1000)}/>
                <span className="option-text">&#8377;500 to &#8377;1000</span>
              </div>
              <div className="option">
                <input type="radio" name="cost" onClick={() => handlePrice(1000,1500)}/>
                <span className="option-text">&#8377;1000 to &#8377;1500</span>
              </div>
              <div className="option">
                <input type="radio" name="cost" onClick={() => handlePrice(1500,2000)}/>
                <span className="option-text">&#8377;1500 to &#8377;2000</span>
              </div>
              <div className="option">
                <input type="radio" name="cost" onClick={() => handlePrice(2000,10000)}/>
                <span className="option-text">&#8377;2000 +</span>
              </div>
            </div>
          </div>
          <div className="options">
            <div className="sort-text">Sort</div>
            <div className="optionsContainer">
              <div className="option">
                <input type="radio" name="sort" onChange={ () => handleSort(1)}/>
                <span className="option-text">Price low to high</span>
              </div>
              <div className="option">
                <input type="radio" name="sort" onChange={() => handleSort(-1)}/>
                <span className="option-text">Price high to low</span>
              </div>
            </div>
          </div>
          {/* <div style={{ display: "flex", justifyContent: "space-evenly",cursor:"pointer" }}>
            <div id="apply" onClick={() => clearFilters()}>Clear filters</div>
          </div> */}
        </div>
      </>
    );
  }
}

export default FilterOptions;
