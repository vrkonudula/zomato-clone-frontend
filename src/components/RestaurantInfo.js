import React from "react";
import "../css/RestaurantInfo.css";

class RestaurantInfo extends React.Component {
  render() {
    const { cusine, minPrice } = this.props;
    return (
      <>
        <div id="about">About this place</div>
        <div className="category">
          <div className="categoryType">Cusine</div>
          <div className="categoryText">
            {cusine.map((cusine, idx) => {
              if (idx === 0) {
                return cusine.name;
              }
              return `, ${cusine.name}`;
            })}
          </div>
        </div>
        <div className="category">
          <div className="categoryType">Average Cost</div>
          <div className="categoryText">
            ₹ {minPrice} for two people (approx.)
          </div>
        </div>
      </>
    );
  }
}

export default RestaurantInfo;
