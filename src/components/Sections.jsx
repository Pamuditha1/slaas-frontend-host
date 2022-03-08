import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getSections } from "../services/getSections";
import { addSection } from "../services/addSection";

function Sections() {
  const [section, setsection] = useState("");
  const [key, setkey] = useState("");
  const [sections, setsections] = useState([]);

  useEffect(() => {
    async function fetchSections() {
      const records = await getSections();
      setsections(records);
    }
    fetchSections();
  }, []);

  const addChange = (e) => {
    if (e.target.name == "key") {
      setkey(e.target.value);
    } else {
      setsection(e.target.value);
    }
  };
  const onAdd = async () => {
    await addSection({
      key: key,
      section: section,
    });
    setsections([
      ...sections,
      {
        keyName: key,
        section: section,
      },
    ]);
    setkey("");
    setsection("");
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
        Membership Sections
      </h4>
      <div className="mt-5">
        <div className="row ml-3">
          <div className="mr-3">Add New Section</div>

          <input
            onChange={addChange}
            value={key}
            name="key"
            className="form-control col-1"
            type="text"
          />
          <input
            onChange={addChange}
            value={section}
            name="section"
            className="form-control col-4"
            type="text"
          />
          <div className="input-group-append col-2 mb-3">
            <button
              style={buttonStyle}
              onClick={onAdd}
              className="btn btn-success"
            >
              +
            </button>
          </div>
        </div>
        <center className="mt-5">
          <ul>
            {sections.length > 0 &&
              sections.map((g) => {
                return (
                  <h5 key={g} className="mt-5">
                    {g.keyName} - {g.section}
                  </h5>
                );
              })}
          </ul>
        </center>
      </div>
    </>
  );
}

export default Sections;
