import React, { useState } from "react";
import { TerminatedTable } from "../projectTables/terminatedMembers/TerminatedTable";
import { Route, Switch } from "react-router-dom";
import SendMails from "./SendMails";

function TerminatedMemberships() {
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
        Terminated Members
      </h4>

      <Switch>
        <Route
          exact
          path="/user/terminated-list"
          render={(props) => <TerminatedTable setList={setList} {...props} />}
        />
        <Route
          path="/user/terminated-list/send-emails"
          render={(props) => <SendMails {...props} emailList={emailList} />}
        />
      </Switch>
    </div>
  );
}

export default TerminatedMemberships;
