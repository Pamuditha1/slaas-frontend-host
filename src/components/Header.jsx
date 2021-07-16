import React, { Component } from "react";
import logo from "../images/slaasLogo.png";

class Header extends Component {
  style = {
    height: "100px",
    backgroundColor: "#7b1418",
    textAlign: "center",
    // marginBottom: "20px",
    color: "white",
    fontSize: "30px",
    fontFamily: "Times New Roman",
    boxShadow: "0px 7px 10px black",
    textShadow: "2px 2px 4px #000000",
  };
  imageStyle = {
    height: "90px",
    width: "auto",
    marginBottom: "0",
    float: "left",
    marginLeft: "10%",
    marginRight: "-15%",
    marginTop: "5px",
    borderRadius: "50px",
    boxShadow:
      " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 30px 0 rgba(0, 0, 0, 0.3)",
  };
  render() {
    return (
      <>
        <div style={this.style} className="sticky-top">
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6">
              <img src={logo} style={this.imageStyle} alt="SLAAS Logo" />
              <div style={{ paddingTop: "20px" }}>SLAAS Member Manager</div>
            </div>
            <div className="col-3"></div>
          </div>
        </div>
      </>
    );
  }
}

export default Header;
