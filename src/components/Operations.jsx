import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";

import { getLastArrearsUpdate } from "../services/getLastArrearsUpdate";
import { getLastRemindersSent } from "../services/getLastReminderMails";
import { getLastAutoTerminats } from "../services/lastAutoTerminateDates";

import { calculateArrears } from "../services/calculateArrears";
import { autoTerminate } from "../services/autoTerminateMembers";
import { sendReminderMails } from "../services/sendReminderMails";

function Operations() {
  const [lastArrears, setlastArrears] = useState("");
  const [lastReminder, setlastReminder] = useState("");
  const [lastTerminate, setlastTerminate] = useState("");

  async function fetchArrearsDates() {
    let date;
    let time;
    let Ldate = await getLastArrearsUpdate();
    date = new Date(Ldate).toLocaleDateString();
    time = new Date(Ldate).toLocaleTimeString();
    setlastArrears(`${date} - ${time}`);
  }
  async function fetchReminderDates() {
    let date;
    let time;
    let Ldate = await getLastRemindersSent();
    date = new Date(Ldate).toLocaleDateString();
    time = new Date(Ldate).toLocaleTimeString();
    setlastReminder(`${date} - ${time}`);
  }

  async function fetchTerminateDates() {
    let date;
    let time;
    let Ldate = await getLastAutoTerminats();
    date = new Date(Ldate).toLocaleDateString();
    time = new Date(Ldate).toLocaleTimeString();
    setlastTerminate(`${date} - ${time}`);
  }

  useEffect(() => {
    fetchArrearsDates();
    fetchReminderDates();
    fetchTerminateDates();
  }, []);

  const toggle = async () => {
    await calculateArrears();
    fetchArrearsDates();
  };

  const sendMails = async () => {
    let result = await sendReminderMails();
    fetchReminderDates();
    console.log("Reminder result", result);
  };
  const terminate = async () => {
    let result = await autoTerminate();
    fetchTerminateDates();
    console.log(result);
  };

  let itemStyle = {
    backgroundColor: "#2d2d2d",
    color: "white",
    width: "100%",
    height: "auto",
    borderRadius: "30px",
    padding: "20px",
    boxShadow: "0px 10px 10px grey",
  };

  const headStyle = {
    textShadow: "0px 0px 1px #111111",
  };

  const buttonStyle = {
    boxShadow: "0px 5px 10px black",
    fontWeight: "bold",
    borderRadius: "40px",
  };

  return (
    <div className="container mt-5">
      <div className="col-12 mt-5 text-center">
        <h4 className="mt-5 mb-5 text-center" style={headStyle}>
          Membership Management Operations
        </h4>
      </div>
      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
          <div className="row mt-5" style={itemStyle}>
            <div className="col-12 mb-3">
              Last Arrears Calculate And Updated :{" "}
              <strong className="ml-5">{lastArrears}</strong>
            </div>
            <div className="col-7">
              <small>This may take some time ...</small>
            </div>
            <div className="col-4">
              <Button
                style={buttonStyle}
                onClick={toggle}
                outline
                color="light"
                className="float-right pl-3 pr-3"
              >
                Calculate Arrears
              </Button>
            </div>
          </div>

          <div className="row mt-5" style={itemStyle}>
            <div className="col-12 mb-3">
              Last Reminder Emails Sent :{" "}
              <strong className="ml-5">{lastReminder}</strong>
            </div>
            <div className="col-7">
              <small>This may take some time ...</small>
            </div>
            <div className="col-4">
              <Button
                style={buttonStyle}
                onClick={sendMails}
                outline
                color="light"
                className="float-right pl-3 pr-3"
              >
                Send Reminder Mails
              </Button>
            </div>
          </div>

          <div className="row mt-5" style={itemStyle}>
            <div className="col-12 mb-3">
              Last Auto Member Termination :{" "}
              <strong className="ml-5">{lastTerminate}</strong>
            </div>
            <div className="col-7">
              <small>This may take some time ...</small>
            </div>
            <div className="col-4">
              <Button
                style={buttonStyle}
                onClick={terminate}
                outline
                color="light"
                className="float-right pl-3 pr-3"
              >
                Auto Terminate
              </Button>
            </div>
          </div>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
}

export default Operations;
