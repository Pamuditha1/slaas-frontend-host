import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import ValidationError from "../../validationError";
import ReceiptGenerator from "../ReceiptGenerator";
import axios from "axios";
import PaymentRecordsForReceipt from "../PaymentRecordsForReceipt";
import { getInvoice } from "../../services/getInvoiceNo";
import { api } from "../../services/api";

function NewMemberPaymentForm() {
  const [step, setStep] = useState(1);
  const paymentMethods = ["Cash", "Bank Draft", "Cheque", "Online"];
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
    arrearsUpdated: null,
  });
  const [totalState, setTotalState] = useState(0);

  const [loading, setLoading] = useState(false);
  // const [viewData, setViewData] = useState({
  //     memberName: '',
  //     membershipNo: '',
  //     nic: '',
  // })

  const [invoiceNum, setInvoiceNum] = useState("");
  useEffect(() => {
    async function fetchInvoice() {
      const invoice = await getInvoice();
      setInvoiceNum(invoice);
    }
    fetchInvoice();
  }, []);

  const onChangeMemNo = (e) => {
    setLoading(true);
    setPaymentData({ membershipNo: e.target.value });
    const fetchData = () => {
      axios(`${api}/user/receipt/${e.target.value}`).then(function (res) {
        const paymentRecords = {
          memPaidLast: res.data.memPaidLast,
          lastPaidForYear: res.data.lastPaidForYear,
          lastMembershipPaid: res.data.lastMembershipPaid,
          arrearsConti: res.data.arrearsConti,
          arrearsUpdated: res.data.arrearsUpdated,
        };
        setPaymentData({
          ...paymentData,
          memberID: res.data.memberID,
          memberName: res.data.nameWinitials,
          nic: res.data.nic,
          membershipNo: res.data.membershipNo,
        });
        setPaymentRecords(paymentRecords);
        // setViewData({
        //     membershipNo: e.target.value,
        //     memberName: res.data.nameWinitials,
        //     nic: res.data.nic
        // })
      });
    };
    fetchData();
    setLoading(false);
  };

  const handleStyle = (n) => {
    // if(formik.errors[n] && formik.touched[n]) return "form-control is-invalid"
    // else if (!formik.errors[n] && formik.touched[n]) return "form-control is-valid"
    // else return "form-control"
  };
  const onClick = () => {
    setPaymentData({
      ...paymentData,
      memberID: "",
      memberName: "",
      nic: "",
      membershipNo: "",
    });
    setPaymentRecords({
      memPaidLast: null,
      lastPaidForYear: null,
      arrearsConti: null,
      arrearsUpdated: null,
    });
  };
  const onchange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value > 0 ? e.target.value : 0,
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

  switch (step) {
    case 1:
      return (
        <form className="container" autoComplete="off">
          <h6
            style={{ backgroundColor: "#e95045" }}
            className="pl-5 pt-1 pb-1 mb-5"
          >
            Payment Receipt
          </h6>

          <div className="row">
            <div className="col-6">
              <div className="row">
                <div className="form-group col-12">
                  <label htmlFor="membershipNo" className="col-5">
                    Membership No
                  </label>
                  <div className="row ml-3">
                    <input
                      onChange={onChangeMemNo}
                      value={paymentData.membershipNo}
                      className="form-control col-10"
                      type="text"
                      id="membershipNo"
                      name="membershipNo"
                    />
                    <div className="input-group-append col-2">
                      <button
                        onClick={onClick}
                        className="btn btn-outline-danger"
                      >
                        X
                      </button>
                    </div>
                  </div>
                </div>
                <div className="form-group col-12">
                  <label htmlFor="memberName" className="col-5">
                    Member Name
                  </label>
                  <input
                    onChange={onchange}
                    value={paymentData.memberName}
                    className="form-control col-11 ml-3"
                    type="text"
                    id="memberName"
                    name="memberName"
                  />
                </div>
                <div className="form-group col-12">
                  <label htmlFor="nic" className="col-5">
                    NIC
                  </label>
                  <input
                    onChange={onchange}
                    value={paymentData.nic}
                    className="form-control col-11 ml-3"
                    type="text"
                    id="nic"
                    name="nic"
                  />
                </div>
                <div className="form-group col-12">
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
            </div>

            <div className="col-6">
              <PaymentRecordsForReceipt
                paymentRecords={paymentRecords}
                membershipNo={paymentData.membershipNo}
              />
            </div>
          </div>

          <div className="row">
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
                Yearly Fee
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
                onChange={onchange}
                className="form-control col-11 ml-3"
                type="text"
                id="description"
                name="description"
              />
            </div>
          </div>

          <button
            onClick={onSubmit}
            type="submit"
            className="btn btn-primary float-right m-1"
          >
            Continue
          </button>
          {/* <button type="submit" className="btn btn-primary float-right m-1">Next</button> */}
          {/* <button type="submit" onClick={() => setStep(1)} className="btn btn-primary float-right m-1">Back</button> */}
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
        />
      );
  }
}

export default NewMemberPaymentForm;
// MemberPaymentForm.propTypes = {
//     paymentMethods : PropTypes.array.isRequired,
//     paymentData: PropTypes.object,
//     setPaymentData: PropTypes.func.isRequired,
//     nextStep: PropTypes.func.isRequired,
//     prevStep: PropTypes.func.isRequired
//   };
