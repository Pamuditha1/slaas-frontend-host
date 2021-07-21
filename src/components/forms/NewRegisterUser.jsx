import React, { useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { addUser } from "../../services/registerUser";

function NewRegisterUser() {
  const formik = useFormik({
    initialValues: {
      userName: "",
      officeID: "",
      email: "",
      nic: "",
      mobile: "",
      fixed: "",
      address: "",
      password: "",
      repeatpassword: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .min(2, "Mininum 2 characters")
        .max(15, "Maximum 10 characters")
        .required("Required!"),
      email: Yup.string().email("Invalid Email").required("Required!"),
      officeID: Yup.string().required("Required!"),
      nic: Yup.string().required("Required!"),
      mobile: Yup.string()
        .length(10, "Should be 10 Numbers")
        .required("Required!"),
      fixed: Yup.string()
        .length(10, "Should be 10 Numbers")
        .required("Required!"),
      address: Yup.string().required("Required!"),
      password: Yup.string()
        .min(5, "Minimum 5 Characters")
        .required("Required!"),
      repeatpassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password's Not Match")
        .required("Required!"),
    }),
    onSubmit: async (values) => {
      console.log("System User Register", values);
      await addUser(values);
    },
  });

  let linkStyle = {
    textDecoration: "none",
    color: "black",
    marginTop: "10px",
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
        {/* <center>
          <Link to="/user/login">
            <button type="button" className="btn btn-light">
              Already Registered? Login
            </button>
          </Link>
        </center> */}
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
        <form
          onSubmit={formik.handleSubmit}
          className="container mt-5"
          autoComplete="off"
        >
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="form-group col-12">
                  <label htmlFor="userName" className="col-5">
                    User Name
                  </label>
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.userName}
                    className="form-control col-11 ml-3"
                    type="text"
                    id="userName"
                    name="userName"
                  />
                  {formik.errors.userName && formik.touched.userName && (
                    <p className="ml-5 mt-2 text-danger">
                      {formik.errors.userName}
                    </p>
                  )}
                </div>
                <div className="form-group col-6">
                  <label htmlFor="officeID" className="col-5">
                    Office ID
                  </label>
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.officeID}
                    className="form-control col-11 ml-3"
                    type="text"
                    id="officeID"
                    name="officeID"
                  />
                  {formik.errors.officeID && formik.touched.officeID && (
                    <p className="ml-5 mt-2 text-danger">
                      {formik.errors.officeID}
                    </p>
                  )}
                </div>
                <div className="form-group col-6">
                  <label htmlFor="nic" className="col-5">
                    NIC
                  </label>
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.nic}
                    className="form-control col-10 ml-3"
                    type="text"
                    id="nic"
                    name="nic"
                  />
                  {formik.errors.nic && formik.touched.nic && (
                    <p className="ml-5 mt-2 text-danger">{formik.errors.nic}</p>
                  )}
                </div>

                <div className="form-group col-6">
                  <label htmlFor="mobile" className="col-5">
                    Contact No (Mobile)
                  </label>
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.mobile}
                    className="form-control col-11 ml-3"
                    type="number"
                    size="10"
                    id="mobile"
                    name="mobile"
                  />
                  {formik.errors.mobile && formik.touched.mobile && (
                    <p className="ml-5 mt-2 text-danger">
                      {formik.errors.mobile}
                    </p>
                  )}
                </div>
                <div className="form-group col-6">
                  <label htmlFor="fixed" className="col-5">
                    Contact No (Fixed)
                  </label>
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.fixed}
                    className="form-control col-10 ml-3"
                    type="number"
                    size="10"
                    id="fixed"
                    name="fixed"
                  />
                  {formik.errors.fixed && formik.touched.fixed && (
                    <p className="ml-5 mt-2 text-danger">
                      {formik.errors.fixed}
                    </p>
                  )}
                </div>
                <div className="form-group col-12">
                  <label htmlFor="email" className="col-5">
                    Email
                  </label>
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    className="form-control col-11 ml-3"
                    type="email"
                    id="email"
                    name="email"
                  />
                  {formik.errors.email && formik.touched.email && (
                    <p className="ml-5 mt-2 text-danger">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
                <div className="form-group col-12">
                  <label htmlFor="address" className="col-5">
                    Address
                  </label>
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.address}
                    className="form-control col-11 ml-3"
                    type="text"
                    id="address"
                    name="address"
                  />
                  {formik.errors.address && formik.touched.address && (
                    <p className="ml-5 mt-2 text-danger">
                      {formik.errors.address}
                    </p>
                  )}
                </div>
                <div className="form-group col-6">
                  <label htmlFor="password" className="col-5">
                    Password
                  </label>
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    maxlength="10"
                    minLength="6"
                    className="form-control col-10 ml-3"
                    type="password"
                    id="password"
                    name="password"
                  />
                  {formik.errors.password && formik.touched.password && (
                    <p className="ml-5 mt-2 text-danger">
                      {formik.errors.password}
                    </p>
                  )}
                </div>
                <div className="form-group col-6">
                  <label htmlFor="repeatpassword" className="col-5">
                    Repeat Password
                  </label>
                  <input
                    onChange={formik.handleChange}
                    value={formik.values.repeatpassword}
                    className="form-control col-10 ml-3"
                    maxlength="10"
                    minLength="6"
                    type="password"
                    id="repeatpassword"
                    name="repeatpassword"
                  />
                  {formik.errors.repeatpassword &&
                    formik.touched.repeatpassword && (
                      <p className="ml-5 mt-2 text-danger">
                        {formik.errors.repeatpassword}
                      </p>
                    )}
                </div>
                <div className="form-group col-12 mt-3">
                  <center>
                    <button
                      style={buttonStyleC}
                      // onClick={submit}
                      type="submit"
                      className="btn btn-success mb-5"
                    >
                      Register
                    </button>
                    {/* <Link to="/applicant/login" style={linkStyle}>
                      <p className="mt-3">Already Registered? Login</p>
                    </Link> */}
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
