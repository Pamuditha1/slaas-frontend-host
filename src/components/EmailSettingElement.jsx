import React, { useState, useEffect } from "react";
import { getOneMailSettings } from "../services/getOneEmailSettingData";
import { updateMailBody } from "../services/updateEmailBody";
import { Link } from "react-router-dom";

function EmailSettingElement(props) {
  const [mailData, setmailData] = useState({
    id: "",
    type: "",
    subject: "",
    body: ``,
  });

  async function fetchData() {
    let result = await getOneMailSettings(props.match.params.id);
    setmailData({
      id: result.id,
      type: result.type,
      subject: result.subject,
      body: result.body,
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const editData = (e) => {
    setmailData({ ...mailData, [e.target.name]: e.target.value });
  };
  const update = async () => {
    console.log(mailData);
    await updateMailBody(mailData);
    fetchData();
  };

  const buttonStyle = {
    boxShadow: "0px 5px 10px grey",
    fontWeight: "bold",
    borderRadius: "40px",
  };

  const headStyle = {
    textShadow: "0px 0px 1px #111111",
  };

  const buttonStyleC = {
    boxShadow: "0px 5px 10px grey",
    fontWeight: "bold",
    backgroundColor: "#005336",
    borderRadius: "40px",
  };

  return (
    <>
      <div className="row mt-3">
        <Link to="/user/email-settings">
          <button
            style={buttonStyle}
            className="btn btn-outline-dark pl-4 pr-4"
          >
            Back
          </button>
        </Link>
      </div>
      <div className="container">
        <h4 className="mb-5 text-center" style={headStyle}>
          Edit Mail Content
        </h4>
        <div className="row mt-5">
          <input
            value={mailData.type}
            className="form-control col-3"
            readOnly={true}
          ></input>
          <input
            type="input"
            value={mailData.subject}
            name="subject"
            onChange={editData}
            className="form-control col-8 ml-3"
            rows="15"
          ></input>
        </div>
        <div className="row">
          <textarea
            type="input"
            value={mailData.body}
            name="body"
            onChange={editData}
            className="form-control col-11 m-5"
            rows="15"
          ></textarea>
        </div>
        <center>
          <button
            style={buttonStyleC}
            onClick={update}
            className="btn btn-success mt-5 mb-5"
          >
            Update Email
          </button>
        </center>
      </div>
    </>
  );
}

export default EmailSettingElement;
