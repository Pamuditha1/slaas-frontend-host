import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getTerminateSettings } from "../services/terminateSettings";
import { updateTPeriods } from "../services/updateTerminationPeriod";

function TerminationPeriods() {
  const [periods, setperiods] = useState([]);

  const [modalPeriod, setmodalPeriod] = useState({
    type: "",
    time: "",
  });
  const [updatingItem, setupdatingItem] = useState("");

  useEffect(() => {
    async function fetchGrades() {
      const records = await getTerminateSettings();
      setperiods(records);
    }
    fetchGrades();
  }, []);

  const viewModal = (p, name) => {
    setmodalPeriod({
      type: name,
      time: p,
    });
    setupdatingItem(name);
  };
  const setPeriodUpdate = (t) => {
    setmodalPeriod({ ...modalPeriod, time: t });
  };
  const updatePeriod = async () => {
    await updateTPeriods(modalPeriod);
    const records = await getTerminateSettings();
    setperiods(records);
    setupdatingItem("");
  };

  const buttonStyle = {
    boxShadow: "0px 5px 10px grey",
    fontWeight: "bold",
    borderRadius: "40px",
  };

  const onCancel = () => {
    setupdatingItem("");
  };
  const headStyle = {
    textShadow: "0px 0px 1px #111111",
  };

  return (
    <>
      <div className="row mt-3">
        <Link to="/user/settings">
          <button
            style={buttonStyle}
            className="btn btn-outline-dark pl-4 pr-4"
          >
            Back
          </button>
        </Link>
      </div>
      <h4 className="mb-5 text-center" style={headStyle}>
        Termination Settings
      </h4>
      <div className="mt-5">
        <center className="mt-5 mr-5">
          <ul className="mt-5">
            {periods.length > 0 &&
              periods.map((p) => {
                return (
                  <div className="row" key={p.period}>
                    <div className="col-12">
                      <h4 className="col-7">
                        {" "}
                        Terminate Suggestion Period :{" "}
                        <span className="ml-3">{p.period}</span> Days
                      </h4>
                      {updatingItem == "Terminate Suggestion Period" && (
                        <button
                          style={buttonStyle}
                          onClick={onCancel}
                          className="col-2 btn btn-secondary mb-5"
                        >
                          Cancel
                        </button>
                      )}
                      {updatingItem != "Terminate Suggestion Period" && (
                        <button
                          style={buttonStyle}
                          onClick={(e) => viewModal(p.period, e.target.name)}
                          name="Terminate Suggestion Period"
                          className="col-2 btn btn-warning mb-5 mt-2"
                        >
                          Update
                        </button>
                      )}
                    </div>
                    <div className="col-12 mb-5">
                      {updatingItem == "Terminate Suggestion Period" && (
                        <div className="row">
                          <div className="col-4"></div>
                          <div className="col-3">
                            <input
                              onChange={(e) => setPeriodUpdate(e.target.value)}
                              name="key"
                              value={modalPeriod.time}
                              className="form-control"
                              type="text"
                            />
                            <center>
                              <small>
                                {modalPeriod.type ==
                                "Terminate Suggestion Period"
                                  ? "Days"
                                  : "Years"}
                              </small>
                            </center>
                          </div>
                          <div className="col-2">
                            <button
                              style={buttonStyle}
                              onClick={() => updatePeriod()}
                              className="btn btn-outline-primary pr-3 pl-3"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="col-12">
                      <h4 className="col-7">
                        {" "}
                        Auto Termination Period :{" "}
                        <spam className="ml-3">{p.autoPeriod}</spam> Years
                      </h4>
                      {updatingItem == "Auto Termination Period" && (
                        <button
                          style={buttonStyle}
                          onClick={onCancel}
                          className="col-2 btn btn-secondary mb-5"
                        >
                          Cancel
                        </button>
                      )}
                      {updatingItem != "Auto Termination Period" && (
                        <button
                          style={buttonStyle}
                          onClick={(e) =>
                            viewModal(p.autoPeriod, e.target.name)
                          }
                          name="Auto Termination Period"
                          className="col-2 btn btn-warning mb-5 mt-2"
                        >
                          Update
                        </button>
                      )}
                    </div>

                    <div className="col-12 mb-5">
                      {updatingItem == "Auto Termination Period" && (
                        <div className="row">
                          <div className="col-4"></div>
                          <div className="col-3">
                            <input
                              onChange={(e) => setPeriodUpdate(e.target.value)}
                              name="key"
                              value={modalPeriod.time}
                              className="form-control"
                              type="text"
                            />
                            <center>
                              <small>
                                {modalPeriod.type ==
                                "Terminate Suggestion Period"
                                  ? "Days"
                                  : "Years"}
                              </small>
                            </center>
                          </div>
                          <div className="col-2">
                            <button
                              style={buttonStyle}
                              onClick={() => updatePeriod()}
                              className="btn btn-outline-primary pr-3 pl-3"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </ul>
        </center>
      </div>
    </>
  );
}

export default TerminationPeriods;
