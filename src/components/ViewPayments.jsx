import React from "react";

import { PaymentsTable } from "../projectTables/payments/PaymentsTable";

function ViewMembers() {
  const headStyle = {
    textShadow: "0px 0px 1px #111111",
  };

  return (
    <div>
      <h4 className="mt-5 mb-5 text-center" style={headStyle}>
        Membership Payments
      </h4>
      <div className="mt-5">
        <PaymentsTable />
      </div>
    </div>
  );
}

export default ViewMembers;
