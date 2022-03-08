import React from "react";
import Helmet from "react-helmet";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";

export default class Example extends React.Component {
  static defaultProps = {
    numberOfMonths: 2,
  };

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.changeShow = this.changeShow.bind(this);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      from: undefined,
      to: undefined,
      show: false,
    };
  }

  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
    this.props.setdateRange(range);
  }

  handleResetClick() {
    this.setState(this.getInitialState());
    this.props.setdateRange(this.getInitialState());
  }
  changeShow() {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    const bstyle = {
      borderRadius: "30px",
      boxShadow: "0px 5px 10px grey",
    };
    const bstyleB = {
      borderRadius: "30px",
      boxShadow: "0px 5px 10px grey",
      backgroundColor: "#580b0d",
    };

    switch (this.state.show) {
      case true: {
        return (
          <center>
            <div className="RangeExample">
              <p
                className="alert alert-primary mr-5 ml-5 font-weight-bold"
                style={{
                  ...bstyle,
                  backgroundColor: "#B3373B",
                  color: "white",
                }}
              >
                {!from && !to && "Please select the first day."}
                {from && !to && "Please select the last day."}
                {from &&
                  to &&
                  `Selected from ${from.toLocaleDateString()} to
                        ${to.toLocaleDateString()}`}{" "}
                {from && to && (
                  <>
                    <button
                      className="link btn btn-light ml-5 pr-5 pl-5"
                      onClick={this.handleResetClick}
                      style={{ ...bstyle, boxShadow: 0 }}
                    >
                      Reset
                    </button>
                    <button
                      onClick={this.props.filterRecords}
                      className="btn btn-dark ml-3 pr-5 pl-5"
                      style={{ ...bstyle, boxShadow: 0 }}
                    >
                      Filter
                    </button>
                  </>
                )}
              </p>

              <DayPicker
                className="Selectable"
                numberOfMonths={this.props.numberOfMonths}
                selectedDays={[from, { from, to }]}
                modifiers={modifiers}
                onDayClick={this.handleDayClick}
              />
              <button
                onClick={this.changeShow}
                className="btn btn-dark ml-3"
                style={bstyle}
              >
                Close
              </button>
              <Helmet>
                <style>{`
                    .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                    background-color: #f0f8ff !important;
                    color: #4a90e2;
                    }
                    .Selectable .DayPicker-Day {
                    border-radius: 0 !important;
                    }
                    .Selectable .DayPicker-Day--start {
                    border-top-left-radius: 50% !important;
                    border-bottom-left-radius: 50% !important;
                    }
                    .Selectable .DayPicker-Day--end {
                    border-top-right-radius: 50% !important;
                    border-bottom-right-radius: 50% !important;
                    }
                    `}</style>
              </Helmet>
            </div>
          </center>
        );
      }

      case false: {
        return (
          <center>
            {from && to && (
              <strong>
                {`Selected from ${from.toLocaleDateString()} to ${to.toLocaleDateString()}`}
              </strong>
            )}{" "}
            <button
              onClick={this.changeShow}
              className="btn btn-primary pr-3 pl-3 ml-5"
              style={bstyleB}
            >
              Select Date Range
            </button>
            {/* <h1>Hello</h1> */}
          </center>
        );
      }
    }
  }
}
