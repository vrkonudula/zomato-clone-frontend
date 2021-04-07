import React from "react";
import "../css/Header.css";
import { Link, withRouter } from "react-router-dom";
import { checkUserDetails } from "../ApiService";
import Login from "./Login";
import Form from "../views/Form";
import UserDetailsMenu from "./UserDetailsMenu";

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loginIsOpen: false,
      createAccountIsOpen: false,
      userLoggedIn: false,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("accessToken");
    if (token !== null) {
      this.setState({ userLoggedIn: true });
    }
  }

  toggleCreateAccountFromLogin() {
    this.setState({ loginIsOpen: false, createAccountIsOpen: true });
  }

  toggleLogin() {
    let temp = this.state.loginIsOpen;
    this.setState({ loginIsOpen: !temp });
  }

  toggleCreateAccount() {
    let temp = this.state.createAccountIsOpen;
    this.setState({ createAccountIsOpen: !temp });
  }

  responseGoogle = (response) => {
      localStorage.setItem("accessToken", response.accessToken);
    this.setState({ userLoggedIn: true, loginIsOpen: false });
  }

  routeToAccount() {
    this.props.history.push("/");
  }

  routeToOrders() {}

  logout() {
    localStorage.removeItem("accessToken");
    this.setState({ userLoggedIn: false });
    this.props.history.push("/");
  }

  async checkDetails() {
    const email = document.getElementById("userName").value;
    const password = document.getElementById("userPassword").value;
    const isLoggedIn = await checkUserDetails({ email, password });
    if (isLoggedIn) {
      this.setState({ userLoggedIn: isLoggedIn, loginIsOpen: false });
    }
  }
  render() {
    const { headerStyle } = this.props;
    const { loginIsOpen, createAccountIsOpen, userLoggedIn } = this.state;
    return (
      <div className={`${headerStyle ? headerStyle : "header"}`}>
        {!headerStyle ? (
          <Link to={"/"}>
            <div className="headerLogo">e!</div>
          </Link>
        ) : null}

        {!userLoggedIn ? (
          <div className="account">
            <div className="login" onClick={() => this.toggleLogin()}>
              Login
            </div>
            <div
              className="create-account"
              onClick={() => this.toggleCreateAccount()}
            >
              Create Account
            </div>
          </div>
        ) : (
          <div id="userDetails">
            <UserDetailsMenu header={this} />
          </div>
        )}
        <Login loginIsOpen={loginIsOpen} header={this} />
        <Form createAccountIsOpen={createAccountIsOpen} header={this} />
      </div>
    );
  }
}

export default withRouter(Header);
