import React, { Component } from "react";

import { addPayment } from "../services/addPaymentService";

class RecordPayment extends Component {
  recordPayment = async () => {
    await addPayment({
      paymentData: this.props.payment,
      previousRecords: this.props.paymentRecords,
    });
    this.props.changePaymentRecorded();
    console.log(this.props);
  };

  render() {
    let type = this.props.type;
    const buttonStyleR = {
      boxShadow: "0px 5px 10px grey",
      fontWeight: "bold",
      backgroundColor: "#002263",
      borderRadius: "50px",
      float: "right",
    };

    return (
      type == "member" && (
        <div style={{ marginRight: "20%" }}>
          <button
            type="submit"
            style={buttonStyleR}
            onClick={this.recordPayment}
            className="btn btn-primary float-right m-1 mb-5"
          >
            Record the Payment
          </button>
        </div>
      )
    );
  }
}

export default RecordPayment;
