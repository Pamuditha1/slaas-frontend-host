import React from "react";
import ReactToPrint from "react-to-print";
import { Button } from "reactstrap";

import ReceiptPrint from "./ReceiptPrint";

class ReceiptGenerator extends React.PureComponent {
  render() {
    const buttonStyleC = {
      boxShadow: "0px 5px 10px grey",
      fontWeight: "bold",
      //backgroundColor: "#005336",
      borderRadius: "50px",
      float: "right",
    };

    const buttonStyle = {
      boxShadow: "0px 5px 10px grey",
      fontWeight: "bold",
      borderRadius: "50px",
      float: "right",
    };
    return (
      <div className="container">
        <ReceiptPrint
          ref={(el) => (this.componentRef = el)}
          paymentData={this.props.paymentData}
          paymentRecords={this.props.paymentRecords}
          invoiceNum={this.props.invoiceNum}
          setInvoiceNum={this.props.setInvoiceNum}
          type={this.props.type}
        />

        <ReactToPrint
          trigger={() => {
            return (
              <Button color="dark mt-1 pl-4 pr-4" href="#" style={buttonStyleC}>
                Download
              </Button>
            );
          }}
          content={() => this.componentRef}
        />
        <button
          type="submit"
          onClick={() => this.props.setStep(1)}
          className="btn btn-secondary float-right m-1 pr-4 pl-4"
          style={buttonStyle}
        >
          Back
        </button>
      </div>
    );
  }
}
export default ReceiptGenerator;
