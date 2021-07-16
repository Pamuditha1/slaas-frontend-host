import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

function SettingItem(props) {
  const [hover, sethover] = useState("");

  const itemstyle = {
    backgroundColor: "#222222",
    opacity: "0.9",
    padding: "10px 10px 10px 10px",
    color: "white",
    borderRadius: "25px",
    fontWeight: "bold",
    fontFamily: "Arial",
    fontSize: "20px",
    textAlign: "center",
    width: "100%",
    height: "100%",
    boxShadow: "0px 5px 10px grey",
  };

  const hoverStyle = {
    backgroundColor: "black",
    opacity: "1",
    padding: "10px 10px 10px 10px",
    color: "white",
    borderRadius: "25px",
    fontWeight: "bold",
    fontFamily: "Arial",
    fontSize: "20px",
    textAlign: "center",
    width: "100%",
    height: "100%",
    boxShadow: "0px 7px 10px black",
  };

  const toggleHover = (e) => {
    sethover(e.target.name);
  };
  const outToggle = () => {
    sethover("");
  };

  return (
    <div className="col-sm-12 col-lg-6 mb-5">
      <Link to={`${props.link}`}>
        <Button
          style={hover == props.link ? hoverStyle : itemstyle}
          onMouseEnter={toggleHover}
          onMouseLeave={outToggle}
          name={props.link}
        >
          <div className="row pl-5 pr-5">
            <div className="col-3"></div>
            <div className="col-6">{props.name}</div>
          </div>
        </Button>
      </Link>
    </div>
  );
}

export default SettingItem;
