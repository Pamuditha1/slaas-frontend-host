import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../css/startPageStyle.css";
import backVideo from "../video/SLAAS.mp4";

let welcome = {
  textShadow: "-5px 5px 5px white",
  fontWeight: "bold",
  color: "black",
  paddingTop: "40px",
  fontSize: "50px",
  zIndex: +2,
};

let iStyle = {
  boxShadow: "-15px 10px 10px black",
  border: "0",
};

const insideStyle = {
  textShadow: "-15px 10px 10px black",
};

const mainLinkStyle = {
  marginLeft: "43%",
  textDecaration: "none",
  color: "black",
  zIndex: "+4",
};

const fontStyle = {
  color: "black",
  textShadow: "-2px 2px 10px black",
};

class StartPage extends Component {
  render() {
    return (
      <div className="container-fulid">
        <video autoPlay loop muted id="video">
          <source src={backVideo} type="video/mp4" />
        </video>
        <h1 style={welcome}>Welcome !.</h1>
        <div className="row mr-5 ml-5" style={{ marginTop: "5%" }}>
          <div className="col-md col-sm-12"></div>
          <div className="col-md col-sm-12">
            <Link to="/user/login">
              <Button
                className="btn selectionButton"
                id="useBtn"
                style={iStyle}
              >
                <FontAwesomeIcon icon={faUserCog} size="5x" className="ml-3" />
                <div className="textStyle" style={insideStyle}>
                  Administrator
                </div>
              </Button>
            </Link>
          </div>
          <div className="col-md col-sm-12"></div>
        </div>
        <div className="col-md col-sm-12 mt-5" style={mainLinkStyle}>
          <a href="https://www.slaas.lk/" target="_blank">
            <h5 style={fontStyle}>SLAAS Main Site</h5>
          </a>
        </div>
      </div>
    );
  }
}

export default StartPage;
