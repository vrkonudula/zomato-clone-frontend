import React from "react";
import "../css/Home.css";
import QuickSearchItem from "../components/QuickSearchItem";

class QuickSearch extends React.Component {
  render() {
    const { quickSearchData } = this.props;
    return (
      <>
        <div className="quickSearches">
          <div className="homeContent">
            <div>
              <p>Quick Searches</p>
              <p
                style={{
                  "fontSize": "18px",
                  "fontWeight": "normal",
                  color: "#8c96ab",
                }}
              >
                Discover restaurants by type of meal
              </p>
            </div>
            <div className="row">
              {quickSearchData.map((item) => {
                return <QuickSearchItem item={item} key={ item.meal_type }/>;
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default QuickSearch;
