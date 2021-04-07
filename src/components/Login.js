import React from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { GoogleLoginButton } from "react-social-login-buttons";
import { GoogleLogin } from "react-google-login";
import { Button, Input, InputAdornment, InputLabel } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const customStyle = {
  content:
    window.innerWidth > 500
      ? {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          height: "50vh",
          width: "40vw",
          minWidth: "300px",
          maxWidth: "400px",
          minHeight: "450px",
          backgroundColor: "#ffffffef",
          padding: "0 10px 10px 10px",
          color: "#192f60",
        }
      : {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          height: "90vh",
          width: "90vw",
          backgroundColor: "#ffffffef",
          padding: "0 10px 10px 10px",
          color: "#192f60",
        },
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      values: {
        amount: "",
        weight: "",
        weightRange: "",
        showPassword: false,
      },
    };
  }
  render() {
    const { loginIsOpen, header } = this.props;
    const { values } = this.state;
    const handleClickShowPassword = () => {
      this.setState({
        values: { ...values, showPassword: !values.showPassword },
      });
    };
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    return (
      <Modal isOpen={loginIsOpen} style={customStyle} ariaHideApp={false}>
        <>
          <div style={{ marginBottom: "30px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1>Login</h1>
              <div style={{ display: "flex", alignItems: "center" }}>
                <IconButton onClick={() => header.toggleLogin()}>
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
            <div>
              <div
                style={{
                  marginBottom: "50px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <InputLabel required={true}>Email</InputLabel>
                <Input
                  type="text"
                  id="userName"
                  style={{ marginBottom: "20px" }}
                />
                <InputLabel color="secondary" required={true}>
                  Password
                </InputLabel>
                <Input
                  id="userPassword"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  style={{ marginBottom: "30px" }}
                  onKeyDown={(e) => {
                    if (e.keyCode === 13) header.checkDetails();
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={() => header.checkDetails()}
                >
                  Login
                </Button>
              </div>
              <div>
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  render={(renderProps) => (
                    <GoogleLoginButton
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    />
                  )}
                  buttonText="Login"
                  onSuccess={header.responseGoogle}
                  onFailure={header.responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
            </div>
          </div>
          <div>
            <hr />
            <div>
              <div
                id="signUpText"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <p>
                  Dont have account?{" "}
                  <span
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => header.toggleCreateAccountFromLogin()}
                  >
                    Create new account
                  </span>
                </p>
              </div>
            </div>
          </div>
        </>
      </Modal>
    );
  }
}

export default Login;
