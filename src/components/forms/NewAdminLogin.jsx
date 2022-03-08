import React, { useState } from "react";
import { Link } from "react-router-dom";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

import { adminLogin } from "../../services/adminLogin";

function NewAdminLogin(props) {
  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });
  const [invalidLogin, setinvalidLogin] = useState(false);

  const onchange = (e) => {
    setloginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    const result = await adminLogin(loginData);
    if (result) {
      localStorage.setItem("token", result.jwt);
      switch (result.type) {
        case "Admin":
          props.history.push("/user/members");
          break;
      }
    } else {
      setinvalidLogin(true);
      toast.error("Invalid Login");
    }
  };

  const style = {
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
  };

  const formStyle = {
    backgroundColor: "rgb(0, 0, 0, 0.7)",
    padding: "50px 30px 30px 30px",
    color: "white",
    borderRadius: "20px",
    boxShadow: "-5px 8px 10px black",
  };

  let linkStyle = {
    textDecoration: "none",
    color: "white",
    marginTop: "10px",
  };

  const buttonStyle = {
    boxShadow: "0px 5px 10px black",
    fontWeight: "bold",
    borderRadius: "40px",
  };

  const inputStyle = {
    boxShadow: "0px 2px 3px white",
    borderRadius: "40px",
  };

  return (
    <div className="row" style={style}>
      <div className="col-4"></div>
      <form className="container mt-5 mb-5 col-4" style={formStyle}>
        <center>
          <FontAwesomeIcon icon={faUserCircle} size="10x" />
        </center>
        <center>
          <small style={{ textAlign: "center" }}>Administrator</small>
        </center>

        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="form-group col-12">
                <label htmlFor="email" className="col-5">
                  Email
                </label>
                <input
                  style={inputStyle}
                  onChange={onchange}
                  value={loginData.email}
                  className="form-control col-11 ml-3"
                  type="text"
                  id="email"
                  name="email"
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

export default NewAdminLogin;
