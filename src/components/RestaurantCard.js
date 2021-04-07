import React from 'react';
import { withRouter } from "react-router-dom";

class RestaurantCard extends React.Component {
    handleClick = (id) => {
        this.props.history.push(`/restaurant/details?id=${id}`);
    }
    render() {
        const { item } = this.props;
        return (
            <div className="card">
              <div className="restaurant">
                <div className="restaurant-image">
                  <img
                    src={item.image}
                    alt="image2"
                    className="image"
                  />
                </div>
                <div className="description">
        
                    <div className="name" onClick={()=>this.handleClick(item._id)}>{item.name}</div>
                
                  <div className="fort">FORT</div>
                  <div className="address">
                    {`${item.locality}, ${item.city}`}
                  </div>
                </div>
              </div>
              <div className="hr">
                <hr />
              </div>
              <div className="restaurant-type">
                <div className="type">CUSINES:</div>
                <div className="type-name">
                  {item.cusine.map((cusine, idx) => {
                    if (idx === 0) {
                      return cusine.name;
                    }
                    return `, ${cusine.name}`;
                  })}
                </div>
              </div>
              <div className="restaurant-type">
                <div className="type">COST FOR TWO:</div>
                <div className="type-name"> &#8377; { item.min_price}</div>
              </div>
            </div>
        )
    }
}

export default withRouter(RestaurantCard);