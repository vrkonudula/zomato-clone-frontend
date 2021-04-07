import React from "react";
import "../css/RestaurantPageDetails.css";
import RestaurantInfo from "../components/RestaurantInfo";
import RestaurantContact from "../components/RestaurantContact";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { withRouter } from "react-router-dom";
import Modal from "react-modal";
import MenuItems from "./MenuItems";
import { getMenuItems } from "../ApiService";
import PaymentInfoForm from "../views/PaymentInfoForm";

const menuStyle = {
  content:
    window.innerWidth > 500
      ? {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          height: "90vh",
          width: "70vw",
          maxWidth: "660px",
          maxHeight: "700px",
        }
      : {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          height: "95vh",
          width: "95vw",
        },
};

class RestaurantPageDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      overview: "overview-show",
      contact: "contact-hidden",
      overviewTab: "selected",
      contactTab: "unselected",
      menuIsOpen: false,
      subTotal: 0,
      menuItems: [],
      paymentDetailsIsopen: false
    };
  }

  handleMenuChange = () => {
    if (this.state.subTotal > 0) {
      this.setState({ menuIsOpen: false });
    this.setState({ paymentDetailsIsopen: true });
    }
    else {
      return alert('Please choose items before payment');
    }    
  }

  closeMenu = () => {
    this.setState({ menuIsOpen: false, subTotal: 0 });
  };

  handleOverviewClick() {
    if (this.state.overview !== "overview-show") {
      this.setState({
        overviewTab: "selected",
        contactTab: "unselected",
        overview: "overview-show",
        contact: "contact-hidden",
      });
    }
  }

  handleContactClick() {
    if (this.state.contact !== "contact-show") {
      this.setState({
        contactTab: "selected",
        overviewTab: "unselected",
        contact: "contact-show",
        overview: "overview-hidden",
      });
    }
  }

  togglePaymentDetails() {
    let temp = this.state.paymentDetailsIsopen;
    this.setState({ paymentDetailsIsopen: !temp });
  }

  render() {
    let { menuIsOpen, subTotal, menuItems, paymentDetailsIsopen } = this.state;
    const { restaurant } = this.props;
    const placeOrder = async (id) => {
      if (localStorage.getItem('accessToken')) {
        const items = await getMenuItems(id);
      this.setState({ menuItems: items });
      this.setState({ menuIsOpen: true });
      }
      else {
        return alert('Please login to place order');
      }
    };
    return (
      <>
        {restaurant.map((item, idx) => {
          return (
            <div key={idx}>
              <div id="navBar">
                <div id="restaurant">
                  <div id="restaurantName">{item.name}</div>
                </div>
                <div id="navTab">
                  <div style={{ display: "flex", alignItems: "flex-end" }}>
                    <nav>
                      <li
                        className={`listStyle ${this.state.overviewTab}`}
                        onClick={() => this.handleOverviewClick()}
                      >
                        Overview
                      </li>
                      <li
                        className={`listStyle ${this.state.contactTab}`}
                        onClick={() => this.handleContactClick()}
                      >
                        Contact
                      </li>
                    </nav>
                  </div>
                  <div id="placeOrder">
                    <button onClick={() => placeOrder(item._id)}>
                      Place online order
                    </button>
                  </div>
                </div>
                <hr />
              </div>
              <div className={`detailsOverview ${this.state.overview}`}>
                <RestaurantInfo
                  cusine={item.cusine}
                  minPrice={item.min_price}
                />
              </div>
              <div className={`detailsContact ${this.state.contact}`}>
                <RestaurantContact
                  contact={item.contact_number}
                  name={item.name}
                  locality={item.locality}
                  city={item.city}
                />
              </div>
            </div>
          );
        })}
        <Modal isOpen={menuIsOpen} style={menuStyle} ariaHideApp={false}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {restaurant.map((item, idx) => {
                return <h1 key={idx}>{item.name}</h1>;
              })}
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton onClick={() => this.closeMenu()}>
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
            <MenuItems details={this} menuItems={ menuItems }/>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                height: "80px",
                backgroundColor: "#f5f8ff",
              }}
            >
              <div
                style={{
                  fontFamily: "Poppins",
                  fontSize: "22px",
                  fontWeight: "bold",
                  fontStretch: "normal",
                  fontStyle: "normal",
                  lineHeight: "1.5",
                  letterSpacing: "normal",
                  textAlign: "left",
                  color: "#292c40",
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "20px",
                }}
              >
                Subtotal :{" "}
                <span style={{ marginLeft: "10px" }}>₹ {subTotal}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "10px",
                }}
              >
                <span
                  style={{
                    padding: "13px 28px 12px 35px",
                    borderRadius: "6px",
                    backgroundColor: "red",
                    fontFamily: "Poppins",
                    fontSize: "18px",
                    fontWeight: "500",
                    fontStretch: "normal",
                    fontStyle: "normal",
                    lineHeight: "1.5",
                    letterSpacing: "normal",
                    textAlign: "left",
                    color: "white",
                    cursor: "pointer"
                  }}
                  onClick={() => this.handleMenuChange()}
                >
                  Pay now
                </span>
              </div>
            </div>
          </div>
        </Modal>
        <PaymentInfoForm paymentDetailsIsopen={paymentDetailsIsopen} details={ this }/>
      </>
    );
  }
}

export default withRouter(RestaurantPageDetails);
