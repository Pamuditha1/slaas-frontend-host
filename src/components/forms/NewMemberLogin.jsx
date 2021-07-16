import React, { useState } from "react";
import { Link } from "react-router-dom";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
// import Background from "../images/cover.jpg";

import { memberLogin } from "../../services/memberLogin";

function NewMemberLogin(props) {
  const [loginData, setloginData] = useState({
    membershipNo: "",
    password: "",
    type: "Member",
  });
  const [invalidLogin, setinvalidLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const onchange = (e) => {
    setloginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
    // console.log(customerData)
  };
  const reload = () => {
    window.location.reload(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    console.log("Mem dts", loginData);
    const result = await memberLogin(loginData);
    console.log("Res", result);
    if (result) {
      localStorage.setItem("MemberToken", result.jwt);
      console.log(props);
      switch (result.type) {
        case "Member":
          const jwt = localStorage.getItem("MemberToken");
          let memNo = jwtDecode(jwt).memNo;
          props.history.push(`/member/profile/${memNo}`);
          break;
      }
    } else {
      setinvalidLogin(true);
      toast.error("Invalid Login");
    }
    console.log(loginData);
    // setLoading(false);
  };

  const style = {
    // backgroundImage: `url(${process.env.PUBLIC_URL + '/image.png'})`

    // backgroundImage: `url(${Background})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  const formStyle = {
    backgroundColor: "rgb(0, 0, 0, 0.7)",
    padding: "50px 30px 30px 30px",
    color: "white",
    borderRadius: "20px",
    // boxShadow:
    //   " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    boxShadow: "-5px 7px 15px black",
  };

  let linkStyle = {
    textDecoration: "none",
    color: "white",
    // color: "#7b1418",
    marginTop: "10px",
  };

  const buttonStyle = {
    boxShadow: "0px 5px 10px black",
    fontWeight: "bold",
    borderRadius: "40px",
  };

  const inputStyle = {
    boxShadow: "0px 2px 3px white",
    // fontWeight: "bold",
    borderRadius: "40px",
    // border: "0",
  };

  return (
    <div className="row" style={style}>
      {/* {invalidLogin && (
        <center>
          <div class="alert alert-warning" role="alert">
            Please check you email and password.{" "}
          </div>
        </center>
      )} */}
      {/* <Link to="/user/login">
          <button type="button" className="btn btn-light">
            Not Registered Yet? Register
          </button>
        </Link> */}

      <div className="col-4"></div>
      <form className="container mt-5 mb-5 col-4" style={formStyle}>
        <center>
          <FontAwesomeIcon icon={faUserCircle} size="10x" />
        </center>
        <center>
          <small style={{ textAlign: "center" }}>Member</small>
        </center>

        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="form-group col-12">
                <label htmlFor="membershipNo" className="col-5">
                  Membership No
                </label>
                <input
                  style={inputStyle}
                  onChange={onchange}
                  value={loginData.membershipNo}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="membershipNo"
                  name="membershipNo"
                />
              </div>
              <div className="form-group col-12">
                <label htmlFor="password" className="col-5">
                  Password
                </label>
                <input
                  style={inputStyle}
                  onChange={onchange}
                  value={loginData.password}
                  className="form-control col-11 ml-3"
                  type="password"
                  id="password"
                  name="password"
                />
              </div>
              <div className="form-group col-12 mt-3">
                <center>
                  <button
                    style={buttonStyle}
                    onClick={submit}
                    type="submit"
                    className="btn btn-success pr-4 pl-4"
                  >
                    Login
                  </button>
                  <Link to="/member/register" style={linkStyle}>
                    <p className="mt-3">Haven't Registered yet? Register</p>
                  </Link>
                  <Link to="/" style={linkStyle}>
                    <p className="mt-5">Home</p>
                  </Link>
                </center>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="col-4"></div>
    </div>
  );
}

export default NewMemberLogin;
