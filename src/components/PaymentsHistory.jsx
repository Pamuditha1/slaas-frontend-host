import React, { useState, useEffect } from "react";

import { PaymentsHistoryTable } from "../projectTables/memberPaymentHistory/PaymentsHistoryTable";

import { getPaymentsHistory } from "../services/getPaymentHistory";
import { getPaymentsSummery } from "../services/getPaymentsSummery";

function PaymentsHistory({ memNo, memberID }) {
  const [paymentsSummery, setpaymentsSummery] = useState({});
  const [paymentsHistory, setpaymentsHistory] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setpaymentsSummery(await getPaymentsSummery(memNo));
      setpaymentsHistory(await getPaymentsHistory(memberID));
    }
    fetchData();
  }, [memberID]);

  const subheadStyle = {
    backgroundColor: "#002263",
    borderRadius: "20px",
    boxShadow: "0px 5px 5px grey",
    color: "white",
  };

  return (
    <div className="container-fulid">
      <div className="row ml-2" id="payment">
        <h6
          style={subheadStyle}
          className="col-12 pl-5 pt-2 pb-2 mt-5 mr-3 mb-5"
        >
          Payment Details
        </h6>
        {/* {paymentsSummery.arrearsConti ? (
          <p className="col-12" style={{ color: "red" }}>
            Arrears to pay - <strong>Rs. {paymentsSummery.arrearsConti}</strong>
          </p>
        ) : (
          <p className="col-12">
            <strong>No Record</strong>
          </p>
        )} */}
        {paymentsSummery.lastPaidForYear ? (
          <p className="col-6">
            Last payment for membership year -{" "}
            <strong>{paymentsSummery.lastPaidForYear}</strong>
          </p>
        ) : (
          <p className="col-12">
            <strong>No Record</strong>
          </p>
        )}
        {paymentsSummery.lastMembershipPaid ? (
          <p className="col-6">
            Last Membership payment date-{" "}
            <strong>
              {new Date(
                paymentsSummery.lastMembershipPaid
              ).toLocaleDateString()}
            </strong>
          </p>
        ) : (
          <p className="col-12">
            <strong>No Record</strong>
          </p>
        )}
        {paymentsSummery.memPaidLast ? (
          <p className="col-6">
            Last payment date- <strong>{paymentsSummery.memPaidLast}</strong>
          </p>
        ) : (
          <p className="col-12">
            <strong>No Record</strong>
          </p>
        )}
      </div>
      <div className="row ml-1">
        <h6 className="col-12 mt-3 mb-3 text-center text-weight-bold border-bottom border-top border-dark pb-3 pt-3">
          Payment Records
        </h6>

        <PaymentsHistoryTable records={paymentsHistory} />
      </div>
    </div>
  );
}

export default PaymentsHistory;
