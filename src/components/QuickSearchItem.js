import React from "react";
import '../css/Home.css'
import { withRouter } from "react-router-dom";

class QuickSearchItem extends React.Component {
  handleClick = (mealType) => {
    sessionStorage.setItem('mealtypeId', mealType);
    let locationId = sessionStorage.getItem('locationId');
    if (locationId) {
      this.props.history.push(`/filter?mealType=${mealType}&area=${locationId}`)
    } else{
      this.props.history.push(`/filter?mealType=${mealType}`)
    }
}

  render() {
    const { item } = this.props;
    return (
        <div className="row-item" onClick={() => this.handleClick(item.meal_type)}>
          <div className="images">
            <img src={item.image} alt="breakfast" />
          </div>
          <div className="info">
            {item.name}
            <div>{item.content}</div>
          </div>
        </div>
    );
  }
}

export default withRouter(QuickSearchItem);
