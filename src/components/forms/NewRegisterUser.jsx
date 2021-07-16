import React, { useState } from "react";
import { Link } from "react-router-dom";

import { addUser } from "../../services/registerUser";

function NewRegisterUser() {
  const [userData, setuserData] = useState({
    userName: "",
    officeID: "",
    email: "",
    nic: "",
    mobile: "",
    fixed: "",
    address: "",

    password: "",
    firstpassword: "",
    repeatpassword: "",
    passError: "",
    type: "applicant",
  });
  const [allowSubmit, setallowSubmit] = useState(true);

  const onchange = (e) => {
    if (e.target.name == "password") {
      setuserData({
        ...userData,
        ["firstpassword"]: e.target.value,
      });
      return;
    }

    if (e.target.name == "repeatpassword") {
      if (e.target.value == userData.firstpassword) {
        setuserData({
          ...userData,
          ["repeatpassword"]: e.target.value,
          ["password"]: e.target.value,
          ["passError"]: "",
        });
        setallowSubmit(true);
        return;
      } else {
        setuserData({
          ...userData,
          ["repeatpassword"]: e.target.value,
          ["passError"]: "Password is different to above",
        });
        setallowSubmit(false);
        return;
      }
    }

    setuserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    console.log(userData);
    await addUser(userData);
  };

  const buttonStyle = {
    boxShadow: "0px 5px 10px grey",
    fontWeight: "bold",
    borderRadius: "40px",
  };
  const headStyle = {
    textShadow: "0px 0px 1px #111111",
  };
  const buttonStyleC = {
    boxShadow: "0px 5px 10px grey",
    fontWeight: "bold",
    backgroundColor: "#005336",
    borderRadius: "40px",
  };

  return (
    <div>
      <div>
        <div className="row mt-3">
          <Link to="/user/settings">
            <button
              style={buttonStyle}
              className="btn btn-outline-dark pl-4 pr-4"
            >
              Back
            </button>
          </Link>
        </div>
        <h4 className="mb-5 text-center" style={headStyle}>
          Register System User
        </h4>
        <form className="container mt-5" autoComplete="off">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="form-group col-12">
                  <label htmlFor="userName" className="col-5">
                    User Name
                  </label>
                  <input
                    onChange={onchange}
                    value={userData.userName}
                    className="form-control col-11 ml-3"
                    type="text"
                    id="userName"
                    name="userName"
                    required
                  />
                </div>
                <div className="form-group col-12">
                  <label htmlFor="officeID" className="col-5">
                    Office ID
                  </label>
                  <input
                    onChange={onchange}
                    value={userData.officeID}
                    className="form-control col-11 ml-3"
                    type="text"
                    id="officeID"
                    name="officeID"
                    required
                  />
                </div>
                <div className="form-group col-12">
                  <label htmlFor="email" className="col-5">
                    Email
                  </label>
                  <input
                    onChange={onchange}
                    value={userData.email}
                    className="form-control col-11 ml-3"
                    type="email"
                    id="email"
                    name="email"
                  />
                </div>
                <div className="form-group col-12">
                  <label htmlFor="nic" className="col-5">
                    NIC
                  </label>
                  <input
                    onChange={onchange}
                    value={userData.nic}
                    className="form-control col-11 ml-3"
                    type="text"
                    id="nic"
                    name="nic"
                  />
                </div>
                <div className="form-group col-12">
                  <label htmlFor="mobile" className="col-5">
                    Contact No (Mobile)
                  </label>
                  <input
                    onChange={onchange}
                    value={userData.mobile}
                    className="form-control col-11 ml-3"
                    type="number"
                    size="10"
                    id="mobile"
                    name="mobile"
                  />
                </div>
                <div className="form-group col-12">
                  <label htmlFor="fixed" className="col-5">
                    Contact No (Fixed)
                  </label>
                  <input
                    onChange={onchange}
                    value={userData.fixed}
                    className="form-control col-11 ml-3"
                    type="number"
                    size="10"
                    id="fixed"
                    name="fixed"
                  />
                </div>
                <div className="form-group col-12">
                  <label htmlFor="address" className="col-5">
                    Address
                  </label>
                  <input
                    onChange={onchange}
                    value={userData.address}
                    className="form-control col-11 ml-3"
                    type="text"
                    id="address"
                    name="address"
                  />
                </div>
                <div className="form-group col-12">
                  <label htmlFor="password" className="col-5">
                    Password
                  </label>
                  <input
                    onChange={onchange}
                    value={userData.firstpassword}
                    maxlength="10"
                    minLength="6"
                    className="form-control col-11 ml-3"
                    type="password"
                    id="password"
                    name="password"
                  />
                </div>
                <div className="form-group col-12">
                  <label htmlFor="repeatpassword" className="col-5">
                    Repeat Password
                  </label>
                  <input
                    onChange={onchange}
                    value={userData.repeatpassword}
                    className="form-control col-11 ml-3"
                    maxlength="10"
                    minLength="6"
                    type="password"
                    id="repeatpassword"
                    name="repeatpassword"
                  />
                  <p className="col-11 ml-3 " style={{ color: "red" }}>
                    {userData.passError}
                  </p>
                </div>
                <div className="form-group col-12 mt-3">
                  <center>
                    <button
                      style={buttonStyleC}
                      onClick={submit}
                      type="submit"
                      className="btn btn-success mb-5"
                      disabled={!allowSubmit}
                    >
                      Register
                    </button>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewRegisterUser;
