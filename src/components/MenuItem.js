import React from "react";
import "../css/MenuItem.css";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

class MenuItem extends React.Component {
  constructor() {
    super();
    this.state = {
      numberOfItems: 0
    }
  }
  
  render() {
    const { numberOfItems } = this.state;
    const { details,menu } = this.props;
    const incrementItem = () => {
      let items = this.state.numberOfItems;
      this.setState({ numberOfItems: items + 1 });
      const cost = Number(document.getElementById('itemCost').innerHTML);
      const temp = details.state.subTotal;
      details.setState({ subTotal: temp + cost });
    }

    const decrementItem = () => {
      let items = this.state.numberOfItems;
      if (numberOfItems === 0)
        return;
      this.setState({ numberOfItems: items - 1 });
      const cost = Number(document.getElementById('itemCost').innerHTML);
      const temp = details.state.subTotal;
      details.setState({ subTotal: temp - cost });
    }
    return (
      <div className="menuItemContainer">
        <div className={`sqr ${menu.itemType===0 ? "vegSqr" : "nonvegSqr"}`}>
          <div className={`cir ${menu.itemType===0 ? "vegCircle" : "nonvegCircle"}`}></div>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            marginBottom: "18px",
            height: "92px",
            justifyContent: "space-between",
          }}
        >
          <div id="itemContent">
            <div id="itemName">{menu.itemName}</div>
            <div id="itemPrice">₹ <span id="itemCost">{ menu.itemPrice }</span></div>
            <div id="itemDescription">{menu.description}</div>
          </div>
          <div className="bluesqr">
            <div className="counterModifier">
              <div style={{ display: "flex", alignItems: "center",cursor:"pointer" }}>
                <RemoveIcon fontSize="small" onClick={() => decrementItem()}/>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>{numberOfItems}</div>
              <div style={{ display: "flex", alignItems: "center",cursor:"pointer" }}>
                <AddIcon fontSize="small" onClick={() => incrementItem()}/>
              </div>
            </div>
          </div>
        </div>
        <hr/>
      </div>
    );
  }
}

export default MenuItem;
