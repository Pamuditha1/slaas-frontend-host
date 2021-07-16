import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-datepicker/dist/react-datepicker.css";

import NotFound from "./NotFound";
import Logins from "./StartPage";
import UserComponent from "./UserComponent";
import Header from "./Header";

class ProjectWindow extends Component {
  render() {
    return (
      <>
        <Header />
        <div>
          <ToastContainer />
          <Switch>
            <Route path="/user" component={UserComponent} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" component={Logins} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </>
    );
  }
}

export default ProjectWindow;
