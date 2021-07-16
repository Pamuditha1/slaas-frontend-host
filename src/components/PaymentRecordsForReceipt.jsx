import React from "react";
import { HashLink } from "react-router-hash-link";

import { oneCalculateArrears } from "../services/getOneArrears";

function PaymentRecordsForReceipt({ paymentRecords, membershipNo }) {
  const backgroundStyle = {
    height: "auto",
    width: "80%",
    margin: "10px 5% 10px 5%",
    padding: "30px",
    backgroundColor: "#fdd30f",
    borderRadius: "30px",
    boxShadow: "0px 5px 10px grey",
  };

  const bstyle = {
    borderRadius: "30px",
    boxShadow: "0px 3px 10px black",
    color: "white",
  };
  const bstyleCal = {
    borderRadius: "30px",
    boxShadow: "0px 3px 10px black",
    color: "white",
    backgroundColor: "#002263",
  };

  const onCalArrears = async (id) => {
    await oneCalculateArrears(id);
  };

  return (
    <div style={backgroundStyle} className="col-12">
      {paymentRecords.arrearsConti ? (
        <p className="col-12" style={{ color: "red" }}>
          Arrears to pay - <strong>Rs. {paymentRecords.arrearsConti}</strong>
        </p>
      ) : (
        <p className="col-12">
          Arrears to pay - <strong>No Record</strong>
        </p>
      )}
      {paymentRecords.arrearsUpdated ? (
        <p className="col-12">
          Arrears Updated -{" "}
          <strong>
            {new Date(paymentRecords.arrearsUpdated).toLocaleDateString()}
          </strong>
        </p>
      ) : (
        <p className="col-12">
          Arrears Updated - <strong>No Record</strong>
        </p>
      )}
      {paymentRecords.lastPaidForYear ? (
        <p className="col-12">
          Last payment for membership year -{" "}
          <strong>{paymentRecords.lastPaidForYear}</strong>
        </p>
      ) : (
        <p className="col-12">
          Last payment for membership year - <strong>No Record</strong>
        </p>
      )}
      {paymentRecords.lastMembershipPaid ? (
        <p className="col-12">
          Last membership payment date -{" "}
          <strong>
            {new Date(paymentRecords.lastMembershipPaid).toLocaleDateString()}
          </strong>
        </p>
      ) : (
        <p className="col-12">
          Last membership payment date - <strong>No Record</strong>
        </p>
      )}
      {paymentRecords.memPaidLast ? (
        <p className="col-12">
          Last payment date - <strong>{paymentRecords.memPaidLast}</strong>
        </p>
      ) : (
        <p className="col-12">
          Last payment date - <strong>No Record</strong>
        </p>
      )}
      <center>
        <HashLink to={`/user/member/profile/${membershipNo}#paymentRecords`}>
          <button
            className="btn btn-dark mt-3"
            style={bstyle}
            disabled={!paymentRecords.memberID}
          >
            View Payment Records
          </button>
        </HashLink>
        <button
          onClick={() => onCalArrears(paymentRecords.memberID)}
          className="btn btn-dark ml-2 mt-3"
          style={bstyleCal}
          disabled={!paymentRecords.memberID}
        >
          Calculate Arrears
        </button>
      </center>
    </div>
  );
}

export default PaymentRecordsForReceipt;
