import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

import MemberReceipt from "./MemberReceipt";
import NewMemberReceipt from "./NewMemberReceipt";

function Receipt() {
  return (
    <div>
      <Switch>
        <Route default path="/user/receipt/member" component={MemberReceipt} />
        <Route path="/user/receipt/new" component={NewMemberReceipt} />
      </Switch>
    </div>
  );
}

export default Receipt;
