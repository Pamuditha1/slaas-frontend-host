import React, { useState } from "react";
import { OutdatedTable } from "../projectTables/outdatedMembersTable/OutdatedTable";
import { Route, Switch } from "react-router-dom";
import SendMails from "./SendMails";

function OutdatedMemberships() {
  const [emailList, setemailList] = useState([]);

  const setList = (l) => {
    setemailList(l);
  };

  const headStyle = {
    textShadow: "0px 0px 1px #111111",
  };

  return (
    <div>
      <h4 className="mt-5 mb-5 text-center" style={headStyle}>
        Outdated Memberships
      </h4>
      <Switch>
        <Route
          exact
          path="/user/outdated-list"
          render={(props) => <OutdatedTable setList={setList} {...props} />}
        />
        <Route
          path="/user/outdated-list/send-emails"
          render={(props) => <SendMails {...props} emailList={emailList} />}
        />
      </Switch>
    </div>
  );
}

export default OutdatedMemberships;
