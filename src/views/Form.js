import "../css/Form.css";
import CloseIcon from "@material-ui/icons/Close";
import Modal from "react-modal";
import {
  Button,
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@material-ui/core";
import { addUser } from "../ApiService";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useState } from "react";

const customStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    minHeight:"500px",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#ffffffef",
    padding: "0 10px 10px 10px",
    color: "#192f60",
  },
};

function Form(props) {
  const { createAccountIsOpen, header } = props;
  const [values, setValues] = useState({
    amount: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const firstName = e.target[0].value;
    const lastName = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;
    const payload = {
      firstName,
      lastName,
      email,
      password,
    };
    addUser(payload);
    alert("User successfully created");
    props.history.push("/");
  };
  return (
    <Modal isOpen={createAccountIsOpen} style={customStyle} ariaHideApp={false}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Create New Account</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => header.toggleCreateAccount()}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <div id="form-main">
        <div id="form-content">
          <div id="form-container">
            <form onSubmit={(e) => handleFormSubmit(e)}>
              <div className="form-field">
                <TextField
                  id="createFirstName"
                  label="First Name"
                  required
                  style={{ margin: 4 }}
                  fullWidth
                  helperText=""
                  variant="filled"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className="form-field">
                <TextField
                  id="createLastName"
                  required
                  label="Last Name"
                  style={{ margin: 4 }}
                  helperText=""
                  fullWidth
                  variant="filled"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className="form-field">
                <TextField
                  id="createEmail"
                  required
                  label="Email"
                  style={{ margin: 4 }}
                  helperText=""
                  fullWidth
                  variant="filled"
                  margin="normal"
                  type="email"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div className="form-field">
                <FormControl fullWidth variant="filled">
                  <InputLabel htmlFor="filled-adornment-password">
                    Password
                  </InputLabel>
                  <FilledInput
                    required
                    style={{ margin: "0 4px 4px 4px" }}
                    id="create-password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
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
                  <FormHelperText id="standard-weight-helper-text"></FormHelperText>
                </FormControl>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  width: "100%",
                  height: "40px",
                  marginTop: "30px",
                }}
              >
                <Button variant="contained" color="primary" type="submit">
                  Create Account
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default Form;
