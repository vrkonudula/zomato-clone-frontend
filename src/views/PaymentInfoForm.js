import "../css/Form.css";
import CloseIcon from "@material-ui/icons/Close";
import Modal from "react-modal";
import { Button, IconButton, TextField } from "@material-ui/core";
import { useState } from "react";

const customStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    minHeight: "500px",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#ffffffef",
    padding: "0 10px 10px 10px",
    color: "#192f60",
  },
};

function PaymentInfoForm(props) {
  const { paymentDetailsIsopen, details } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  const buildForm = ({ action, params }) => {
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", action);

    Object.keys(params).forEach((key) => {
      const input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("value", stringifyValue(params[key]));
      form.appendChild(input);
    });

    return form;
  };

    const isDate = (val) => {
        // Cross realm comptatible
        return Object.prototype.toString.call(val) === '[object Date]'
    }

    const isObj = (val) => {
        return typeof val === 'object'
    }

    const stringifyValue = (val) => {
        if (isObj(val) && !isDate(val)) {
            return JSON.stringify(val)
        } else {
            return val
        }
    }

  const post = (details) => {
    const form = buildForm(details);
    document.body.appendChild(form);
    form.submit();
    form.remove();
  };

  const getData = async (data) => {
    try {
      const response = await fetch(`http://localhost:2020/api/payment`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const respData = await response.json();
      return respData;
    } catch (e) {
      console.log(e);
    }
  };

  const makePayment = async (e) => {
    e.preventDefault();
    const response = await getData({
      amount: details.state.subTotal,
      email: email,
    });
    var information = {
      action: "https://securegw-stage.paytm.in/order/process",
      params: response,
    };
    post(information);
    details.setState({ subTotal: 0 });
  };
  return (
    <Modal
      isOpen={paymentDetailsIsopen}
      style={customStyle}
      ariaHideApp={false}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Customer Details</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => details.togglePaymentDetails()}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <div id="form-main">
        <div id="form-content">
          <div id="form-container">
            <form onSubmit={(e) => makePayment(e)}>
              <div className="form-field">
                <TextField
                  id="createName"
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  id="createContact"
                  required
                  label="Contact Number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                <TextField
                  id="createAddress"
                  required
                  label="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
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
                  Proceed to Payment
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default PaymentInfoForm;
