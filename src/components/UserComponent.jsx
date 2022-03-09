import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import ViewMembers from "./ViewMembers";
import ViewPayments from "./ViewPayments";
import NewRegisterForm from "../components/forms/NewRegisterForm";
import SendMails from "./SendMails";
import OutdatedMemberships from "./OutdatedMemberships";
import Settings from "./Settings";
import Grades from "./Grades";
import Sections from "./Sections";
import Operations from "./Operations";
import TerminatedMembers from "./TerminatedMembers";
import TerminationPeriods from "./TerminationPeriods";
import Commities from "./Commities";
import SetCommitteMembers from "./SetCommitteMembers";
import SuiteSidebar from "./SuiteSidebar";
import { MemberProfileWUpdate } from "./MemberProfileWUpdate";
import NewAdminLogin from "./forms/NewAdminLogin";
import NewRegisterUser from "./forms/NewRegisterUser";
import FormarCommittees from "./FomerCommittees";
import EmailSettings from "./EmailSettings";
import EmailSettingElement from "./EmailSettingElement";
import MemberReceipt from "./MemberReceipt";
import NewMemberReceipt from "./NewMemberReceipt";
import PrivateRoute from "./PrivateRoute";
import jwtDecode from "jwt-decode";

function UserComponent(props) {
  const [emailsList, setemailsList] = useState([]);
  const [arrearsCalculating, setarrearsCalculating] = useState(false);

  function setArr(b) {
    setarrearsCalculating(b);
  }
  function setMails(list) {
    setemailsList(list);
  }

  const currentLocation = props.location.pathname;
  const link = "/user/register-member";
  const accountType = "user";

  let jwt = localStorage.getItem("token");
  let token;
  let userType;

  if (jwt) {
    token = jwtDecode(jwt);
    userType = token.type;
  }

  return (
    <div className="row">
      <div className={currentLocation !== "/user/login" && "col-2"}>
        {currentLocation !== "/user/login" && <SuiteSidebar />}
      </div>
      <div className={currentLocation !== "/user/login" ? "col-10" : "col-12"}>
        <Switch>
          <Route path="/user/login" exact component={NewAdminLogin} />
          <PrivateRoute
            path="/user/register-user"
            component={() => <NewRegisterUser accountType={accountType} />}
          />
          <PrivateRoute
            path="/user/register-member"
            component={NewRegisterForm}
          />
          <PrivateRoute
            exact
            path="/user/member/profile/:id"
            component={MemberProfileWUpdate}
          />
          <PrivateRoute
            path="/user/members"
            render={(props) =>
              token && userType === "Admin" ? (
                <ViewMembers
                  emailsList={emailsList}
                  setMails={setMails}
                  {...props}
                />
              ) : (
                <Redirect to={"/user/login"} />
              )
            }
          />
          <PrivateRoute path="/user/send-mails" component={SendMails} />
          <PrivateRoute path="/user/payments/view" component={ViewPayments} />
          <PrivateRoute
            path="/user/outdated-list"
            component={OutdatedMemberships}
          />
          <PrivateRoute
            path="/user/terminated-list"
            component={TerminatedMembers}
          />
          <PrivateRoute
            path="/user/operations"
            render={(props) =>
              token && userType === "Admin" ? (
                <Operations setArr={setArr} {...props} />
              ) : (
                <Redirect to={"/user/login"} />
              )
            }
          />
          <PrivateRoute
            path="/user/manage-committees"
            component={SetCommitteMembers}
          />
          <PrivateRoute path="/user/receipt/member" component={MemberReceipt} />
          <PrivateRoute path="/user/receipt/new" component={NewMemberReceipt} />
          <PrivateRoute exact path="/user/settings" component={Settings} />
          <PrivateRoute path="/user/settings/grades" component={Grades} />
          <PrivateRoute path="/user/settings/sections" component={Sections} />
          <PrivateRoute
            path="/user/settings/terminations"
            component={TerminationPeriods}
          />
          <PrivateRoute
            path="/user/settings/committees"
            component={Commities}
          />
          <PrivateRoute
            path="/user/committees/history"
            component={FormarCommittees}
          />
          <PrivateRoute
            exact
            path="/user/email-settings"
            component={EmailSettings}
          />
          <PrivateRoute
            path="/user/email-settings/edit/:id"
            component={EmailSettingElement}
          />
        </Switch>
      </div>
    </div>
  );
}
export default UserComponent;
