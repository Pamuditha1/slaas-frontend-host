import React from "react";
import logo from "../images/logoR.png";
import { ToWords } from "to-words";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faExclamation } from "@fortawesome/free-solid-svg-icons";

import RecordPayment from "./RecordPayment";

const toWords = new ToWords();

class ReceiptPrint extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      invoiceNo: "",
      today: "",
      time: "",
      dateTimeSave: "",
      total: "",
      totalWords: "",
      paymentRecord: this.props.paymentData,
      paymentRecorded: false,
    };
  }

  async componentDidMount() {
    const dateTimeSave = new Date();
    const todayD = new Date().toLocaleDateString();
    const timeD = new Date().toLocaleTimeString();

    let totalD =
      (this.props.paymentData.admissionFee
        ? parseInt(this.props.paymentData.admissionFee)
        : 0) +
      (this.props.paymentData.yearlyFee
        ? parseInt(this.props.paymentData.yearlyFee)
        : 0) +
      (this.props.paymentData.arrearsFee
        ? parseInt(this.props.paymentData.arrearsFee)
        : 0) +
      (this.props.paymentData.idCardFee
        ? parseInt(this.props.paymentData.idCardFee)
        : 0);

    if (totalD) {
      var totalWordsD = toWords.convert(totalD.toString(), {
        currency: true,
        ignoreDecimal: true,
      });
    }

    this.setState({
      invoiceNo: this.props.invoiceNum,
      dateTimeSave: dateTimeSave,
      today: todayD,
      time: timeD,
      total: totalD,
      totalWords: totalWordsD,
    });
  }
  changePaymentRecorded = () => {
    this.setState({
      paymentRecorded: true,
    });
  };
  onChangeInNo = (e) => {
    this.setState({
      invoiceNo: e.target.value,
    });
    this.props.setInvoiceNum(e.target.value);
  };

  render() {
    const backgroundStyle = {
      height: "561px",
      width: "792px",
      border: "3px solid black",
      margin: "3% 10% 10px 5%",
      padding: "20px",
      boxShadow: "0px 5px 10px grey",
    };
    const logoStyle = {
      height: "50px",
      width: "auto",
      marginRight: "20px",
    };

    return (
      <>
        <div className="container" style={backgroundStyle}>
          <div className="row" id="payment">
            <h5 className="col-12" style={{ textAlign: "center" }}>
              <img src={logo} style={logoStyle} />
              Sri Lanka Association for the Advancement of Science
            </h5>
            <h6 className="col-12" style={{ textAlign: "center" }}>
              Membership Payment Receipt
            </h6>

            <div className="col-12 mb-3" style={{ marginTop: "5%" }}>
              <div className="row">
                <div className="col-9">
                  <label htmlFor="invoiceNo" className="col-3">
                    <strong>Receipt No</strong>
                  </label>
                  <input
                    type="text"
                    id="invoiceNo"
                    className="col-4 mt-1"
                    name="invoiceNo"
                    value={this.state.invoiceNo}
                    onChange={this.onChangeInNo}
                  />
                </div>

                <p className="col-3">
                  Date : <strong>{this.state.today}</strong>
                </p>
                <div className="col-9"></div>
                <p className="col-3">
                  Time : <strong>{this.state.time}</strong>
                </p>
              </div>
            </div>

            <div className="col-7">
              <div className="row">
                <p className="col-5">Member Name : </p>
                <strong className="col-7">
                  {this.props.paymentData.memberName}
                </strong>
                {this.props.type == "member" && (
                  <>
                    <p className="col-5">Membership No: </p>
                    <strong className="col-7">
                      {this.props.paymentData.membershipNo}
                    </strong>
                  </>
                )}
                <p className="col-5">NIC : </p>
                <strong className="col-7">{this.props.paymentData.nic}</strong>
                <p className="col-5">Payment Method : </p>
                <strong className="col-7">
                  {this.props.paymentData.paymentMethod}
                </strong>
              </div>
            </div>
            <div className="col-5">
              <div className="row">
                <p className="col-7">Admission Fee : </p>
                <strong className="col-4">
                  Rs.{" "}
                  {this.props.paymentData.admissionFee
                    ? this.props.paymentData.admissionFee
                    : 0}
                </strong>
                <p className="col-7">
                  Membership Fee{" "}
                  <strong>
                    {this.props.paymentData.yearOfPayment
                      ? this.props.paymentData.yearOfPayment
                      : ""}
                  </strong>
                  :{" "}
                </p>
                <strong className="col-4">
                  Rs.{" "}
                  {this.props.paymentData.yearlyFee
                    ? this.props.paymentData.yearlyFee
                    : 0}
                </strong>
                <p className="col-7">Arrears Fee : </p>
                <strong className="col-4">
                  Rs.{" "}
                  {this.props.paymentData.arrearsFee
                    ? this.props.paymentData.arrearsFee
                    : 0}
                </strong>
                <p className="col-7">ID Card Fee : </p>
                <strong className="col-4">
                  Rs.{" "}
                  {this.props.paymentData.idCardFee
                    ? this.props.paymentData.idCardFee
                    : 0}
                </strong>
                <p className="col-7" style={{ fontSize: 17 }}>
                  <strong>Total : </strong>
                </p>
                <strong
                  className="col-4 border-top border-dark"
                  style={{ fontSize: 17 }}
                >
                  Rs. {this.state.total ? this.state.total : 0}
                </strong>
              </div>
            </div>

            <div className="row"></div>
            <p className="col-3">Total Payment : </p>
            <strong className="col-9">{this.state.totalWords}</strong>
            <p className="col-3">Description : </p>
            <strong className="col-9">
              {this.props.paymentData.description}
            </strong>
          </div>
        </div>

        <div style={{ marginLeft: "10%" }} className="mt-5">
          {this.props.type == "member" &&
            (this.state.paymentRecorded ? (
              <h6 style={{ color: "green" }}>
                <FontAwesomeIcon icon={faCheck} size="2x" /> Payment has been
                Recorded
              </h6>
            ) : (
              <h6 style={{ color: "red" }}>
                <FontAwesomeIcon icon={faExclamation} size="2x" /> Payment
                hasn't been Recorded yet
              </h6>
            ))}

          <RecordPayment
            payment={this.state}
            paymentRecords={this.props.paymentRecords}
            record={this.recordPayment}
            changePaymentRecorded={this.changePaymentRecorded}
            type={this.props.type}
          />
        </div>
      </>
    );
  }
}
export default ReceiptPrint;
