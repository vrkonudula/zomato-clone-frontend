import React from "react";
import "../css/RestaurantCards.css";
import RestaurantCard from "./RestaurantCard";

class RestaurantCards extends React.Component {
  render() {
    const { restaurants, pages, pageNumber, filter } = this.props;
    let handlePreviousPage = async (pageNumber, totalPages) => {
      pageNumber--;
      if (pageNumber >= 1) {
        await filter.setState({ page: pageNumber });
        await filter.makeApiCall();
      }
    };

    let handleNextPage = async (pageNumber, totalPages) => {
      pageNumber++;
      if (pageNumber <= totalPages) {
        await filter.setState({ page: pageNumber });
        await filter.makeApiCall();
      }
    };
    return (
      <div className="cards">
        {restaurants.length > 0 ? (
          restaurants.map((item, idx) => {
            return <RestaurantCard item={item} key={idx} />;
          })
        ) : (
          <div className="no-result">Sorry, no results found.</div>
        )}

        <div className="pages-nav">
          {pages.length > 1 ? (
            <div className="pages">
              <div
                className="page-unselected pointer"
                onClick={() => handlePreviousPage(pageNumber, pages.length)}
              >
                &lt;
              </div>
              {pages.map((page, pageidx) => {
                return (
                  <div
                    className={
                      pageidx + 1 === pageNumber
                        ? "page-selected"
                        : "page-unselected"
                    }
                    key={pageidx}
                  >
                    {page}
                  </div>
                );
              })}
              <div
                className="page-unselected pointer"
                onClick={() => handleNextPage(pageNumber, pages.length)}
              >
                &gt;
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default RestaurantCards;
