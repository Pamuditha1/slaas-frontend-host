import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getCommities } from "../services/getCommitties";
import { addCommittee } from "../services/addCommittee";

function Commities() {
  const [committee, setcommittee] = useState("");
  const [committies, setcommitties] = useState([]);

  useEffect(() => {
    async function fetchSections() {
      const records = await getCommities();
      setcommitties(records);
    }
    fetchSections();
  }, []);

  const addChange = (e) => {
    setcommittee(e.target.value);
  };
  const onAdd = async () => {
    await addCommittee({
      committe: committee,
    });
    setcommitties([
      ...committies,
      {
        committe: committee,
      },
    ]);
    setcommittee("");
  };

  const headStyle = {
    textShadow: "0px 0px 1px #111111",
  };

  const buttonStyle = {
    boxShadow: "0px 5px 10px grey",
    fontWeight: "bold",
    borderRadius: "40px",
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
        Manage Committees
      </h4>
      <div className="mt-5">
        <div className="row ml-3">
          <div className="mr-3 ml-5">Add New Committee</div>
          <input
            onChange={addChange}
            value={committee}
            name="section"
            className="form-control col-7"
            type="text"
          />
          <div className="input-group-append col-2 mb-3">
            <button
              style={buttonStyle}
              onClick={onAdd}
              className="btn btn-outline-dark"
            >
              +
            </button>
          </div>
        </div>
        <center className="mt-5">
          <ul>
            {committies.length > 0 &&
              committies.map((g) => {
                return <h4 key={g}>{g.committe}</h4>;
              })}
          </ul>
        </center>
      </div>
    </>
  );
}

export default Commities;
