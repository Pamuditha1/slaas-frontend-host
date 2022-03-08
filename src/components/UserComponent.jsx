import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

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

  return (
    <div className="row">
      <div className={currentLocation !== "/user/login" && "col-2"}>
        {currentLocation !== "/user/login" && <SuiteSidebar />}
      </div>
      <div className={currentLocation !== "/user/login" ? "col-10" : "col-12"}>
        <Switch>
          <Route path="/user/login" exact component={NewAdminLogin} />
          <Route
            path="/user/register-user"
            component={() => <NewRegisterUser accountType={accountType} />}
          />
          <Route path="/user/register-member" component={NewRegisterForm} />
          <Route
            exact
            path="/user/member/profile/:id"
            component={MemberProfileWUpdate}
          />
          <Route
            path="/user/members"
            render={(props) => (
              <ViewMembers
                emailsList={emailsList}
                setMails={setMails}
                {...props}
              />
            )}
          />
          <Route path="/user/send-mails" component={SendMails} />
          <Route path="/user/payments/view" component={ViewPayments} />
          <Route path="/user/outdated-list" component={OutdatedMemberships} />
          <Route path="/user/terminated-list" component={TerminatedMembers} />
          <Route
            path="/user/operations"
            render={(props) => <Operations setArr={setArr} {...props} />}
          />
          <Route
            path="/user/manage-committees"
            component={SetCommitteMembers}
          />
          <Route path="/user/receipt/member" component={MemberReceipt} />
          <Route path="/user/receipt/new" component={NewMemberReceipt} />
          <Route exact path="/user/settings" component={Settings} />
          <Route path="/user/settings/grades" component={Grades} />
          <Route path="/user/settings/sections" component={Sections} />
          <Route
            path="/user/settings/terminations"
            component={TerminationPeriods}
          />
          <Route path="/user/settings/committees" component={Commities} />
          <Route path="/user/committees/history" component={FormarCommittees} />
          <Route exact path="/user/email-settings" component={EmailSettings} />
          <Route
            path="/user/email-settings/edit/:id"
            component={EmailSettingElement}
          />
        </Switch>
      </div>
    </div>
  );
}
export default UserComponent;
