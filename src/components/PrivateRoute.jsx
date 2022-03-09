import React from "react";
import { Route, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";

const PrivateRoute = ({ component: Component, render, ...rest }) => {
  let jwt = localStorage.getItem("token");
  let token;
  let userType;

  if (jwt) {
    token = jwtDecode(jwt);
    userType = token.type;
  }
  return (
    <Route
      {...rest}
      render={
        Component
          ? (props) =>
              token && userType === "Admin" ? (
                <Component {...props} />
              ) : (
                <Redirect to={"/user/login"} />
              )
          : render
      }
    />
  );
};

export default PrivateRoute;
