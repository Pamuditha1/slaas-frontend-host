import React, { useState } from "react";

import ReceiptGenerator from "./ReceiptGenerator";

function NewMemberReceipt() {
  const [step, setStep] = useState(1);
  const paymentMethods = [
    "Select Method",
    "Cash",
    "Bank Draft",
    "Cheque",
    "Online",
  ];
  const [paymentData, setPaymentData] = useState({
    memberID: "",
    memberName: "",
    membershipNo: "",
    nic: "",

    admissionFee: "",
    yearOfPayment: "",
    yearlyFee: "",
    arrearsFee: "",
    idCardFee: "",

    paymentMethod: "",
    description: "",
  });
  const [paymentRecords, setPaymentRecords] = useState({
    memPaidLast: null,
    lastPaidForYear: null,
    arrearsConti: null,
  });
  const [type, settype] = useState("new");

  const [invoiceNum, setInvoiceNum] = useState("");

  const onchange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value > 0 ? e.target.value : 0,
    });
  };
  const onchangeData = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };
  const onchangeSelect = (e) => {
    setPaymentData({
      ...paymentData,
      paymentMethod: e.target.value,
    });
  };
  const onSubmit = (e) => {
    setStep(2);
  };

  const headStyle = {
    textShadow: "0px 0px 1px #111111",
  };

  const buttonStyleC = {
    boxShadow: "0px 5px 10px grey",
    fontWeight: "bold",
    backgroundColor: "#005336",
    borderRadius: "30px",
  };

  switch (step) {
    case 1:
      return (
        <form className="container" autoComplete="off">
          <h4 className="mt-5 mb-5 text-center" style={headStyle}>
            New Member Payment Receipt
          </h4>

          <div className="row">
            <div className="form-group col-6">
              <label htmlFor="memberName" className="col-5">
                Member Name
              </label>
              <input
                onChange={onchangeData}
                value={paymentData.memberName}
                className="form-control col-11 ml-3"
                type="text"
                id="memberName"
                name="memberName"
              />
            </div>
            <div className="form-group col-6">
              <label htmlFor="nic" className="col-5">
                NIC
              </label>
              <input
                onChange={onchangeData}
                value={paymentData.nic}
                className="form-control col-11 ml-3"
                type="text"
                id="nic"
                name="nic"
              />
            </div>
            <div className="form-group col-6">
              <label htmlFor="paymentMethod" className="col-5">
                Payment Method
              </label>
              <select
                onChange={onchangeSelect}
                value={paymentData.paymentMethod}
                className="form-control col-11 ml-3"
                required
              >
                {paymentMethods.map((option) => {
                  return (
                    <option
                      key={option}
                      value={option}
                      style={{ textAlign: "center" }}
                    >
                      {option}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="row mt-5 mb-5">
            <div className="form-group col-12 ml-5">
              <strong>Payment Amount</strong>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-6">
              <label htmlFor="yearOfPayment" className="col-5">
                Year of Payment
              </label>
              <input
                onChange={onchange}
                value={paymentData.yearOfPayment}
                className="form-control col-11 ml-3"
                type="number"
                id="yearOfPayment"
                name="yearOfPayment"
              />
            </div>
            <div className="form-group col-6">
              <label htmlFor="yearlyFee" className="col-5">
                Membership Fee
              </label>
              <input
                onChange={onchange}
                value={paymentData.yearlyFee}
                className="form-control col-11 ml-3"
                type="number"
                id="yearlyFee"
                name="yearlyFee"
              />
            </div>
            <div className="form-group col-6">
              <label htmlFor="admissionFee" className="col-5">
                Admission Fee
              </label>
              <input
                onChange={onchange}
                value={paymentData.admissionFee}
                className="form-control col-11 ml-3"
                type="number"
                id="admissionFee"
                name="admissionFee"
              />
            </div>
            <div className="form-group col-6">
              <label htmlFor="idCardFee" className="col-5">
                ID Card Fee
              </label>
              <input
                onChange={onchange}
                value={paymentData.idCardFee}
                className="form-control col-11 ml-3"
                type="number"
                id="idCardFee"
                name="idCardFee"
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-6">
              <label htmlFor="arrearsFee" className="col-5">
                Arrears Fee
              </label>
              <input
                onChange={onchange}
                value={paymentData.arrearsFee}
                className="form-control col-11 ml-3"
                type="number"
                id="arrearsFee"
                name="arrearsFee"
              />
            </div>
          </div>
          <div className="row">
            <div value={paymentData.description} className="form-group col-12">
              <label htmlFor="description" className="col-3">
                Description
              </label>
              <input
                onChange={onchangeData}
                className="form-control col-11 ml-3"
                type="text"
                id="description"
                name="description"
              />
            </div>
          </div>

          <button
            style={buttonStyleC}
            onClick={onSubmit}
            type="submit"
            className="btn btn-primary float-right m-1 mt-3 mb-5 pr-5 pl-5"
          >
            Continue
          </button>
        </form>
      );
    case 2:
      return (
        <ReceiptGenerator
          invoiceNum={invoiceNum}
          setInvoiceNum={setInvoiceNum}
          paymentData={paymentData}
          paymentRecords={paymentRecords}
          setStep={setStep}
          type={type}
        />
      );
  }
}

export default NewMemberReceipt;
