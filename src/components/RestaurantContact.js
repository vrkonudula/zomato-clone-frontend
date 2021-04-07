import React from "react";
import "../css/RestaurantContact.css";

class RestaurantContact extends React.Component {
  render() {
    const { locality, city,contact,name} = this.props;
    return (
      <>
        <div id="phonNumber">
          <div id="phone">Phone Number</div>
          <div id="number">+{`${contact.slice(0,2)} ${contact.slice(2,12)}` }</div>
        </div>
        <div id="address">
          <div id="name">{name}</div>
          <div id="addressText">
            {`${locality}, ${city}`}
          </div>
        </div>
      </>
    );
  }
}

export default RestaurantContact;
