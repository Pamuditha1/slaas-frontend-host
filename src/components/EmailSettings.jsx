import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";

import { getMailSettings } from "../services/getMailSettingsData";

function EmailSettings() {
  const [emailData, setemailData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let result = await getMailSettings();
      setemailData(result);
    }
    fetchData();
  }, []);

  const buttonStyle = {
    boxShadow: "0px 5px 10px grey",
    fontWeight: "bold",
    borderRadius: "40px",
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
        Email Settings
      </h4>
      <div className="container">
        <Table hover borderless className="mt-5">
          <thead className="text-center">
            <tr>
              <th>No</th>
              <th>Type</th>
              <th>Subject</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {emailData.map((e, index) => {
              return (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{e.type}</td>
                  <td className="text-center">{e.subject}</td>
                  <td className="text-center">
                    <Link to={`/user/email-settings/edit/${e.id}`}>
                      <button
                        className="btn btn-outline-warning"
                        style={buttonStyle}
                      >
                        Edit
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default EmailSettings;
