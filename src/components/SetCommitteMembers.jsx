import React, { useState, useEffect } from "react";

import OneCommittee from "./OneCommittee";

import { getCommities } from "../services/getCommitties";

function SetCommitteMembers() {
  const [committies, setcommitties] = useState([]);
  const [selectedCommity, setselectedCommity] = useState("");
  const [clicked, setclicked] = useState("");

  useEffect(() => {
    async function fetchSections() {
      const records = await getCommities();
      setcommitties(records);
    }
    fetchSections();
  }, []);

  const setCommity = (c) => {
    setselectedCommity(c);
    setclicked(c);
  };

  const buttonStyle = {
    boxShadow: "0px 5px 10px grey",
    fontWeight: "bold",
    borderRadius: "40px",
  };

  const headStyle = {
    textShadow: "0px 0px 1px #111111",
  };

  return (
    <div>
      <h4 className="mt-5 mb-5 text-center" style={headStyle}>
        Manage Committees
      </h4>
      <div className="row">
        {committies.length > 0 &&
          committies.map((g) => {
            return (
              <div key={g.id} className="col-6 mt-3 text-center">
                <button
                  style={buttonStyle}
                  className={
                    clicked == g.committe
                      ? "btn btn-dark"
                      : "btn btn-outline-dark"
                  }
                  onClick={() => setCommity(g.committe)}
                >
                  {g.committe}
                </button>
              </div>
            );
          })}
      </div>
      <div className="container">
        {selectedCommity && <OneCommittee comm={selectedCommity} />}
      </div>
    </div>
  );
}

export default SetCommitteMembers;
