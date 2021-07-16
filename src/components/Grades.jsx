import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getGrades } from "../services/getGrades";
import { addGrade } from "../services/addGrade";
import { updateGradeS } from "../services/updateGrade";

function Grades() {
  const [grade, setgrade] = useState("");
  const [membershipFee, setmembershipFee] = useState("");
  const [grades, setgrades] = useState([]);

  const [isModalOpen, setisModalOpen] = useState(false);
  const [modalGrade, setmodalGrade] = useState({});
  const [updatingItem, setupdatingItem] = useState("");

  useEffect(() => {
    async function fetchGrades() {
      const records = await getGrades();
      setgrades(records);
    }
    fetchGrades();
  }, []);

  const addChange = (e) => {
    if (e.target.name == "grade") setgrade(e.target.value);
    else setmembershipFee(e.target.value);
  };
  const onAdd = async () => {
    console.log(grade);
    await addGrade({
      grade: grade,
      membershipFee: membershipFee,
    });
    setgrades([
      ...grades,
      {
        grade: grade,
        membershipFee: membershipFee,
      },
    ]);
    setgrade("");
    setmembershipFee("");
  };

  const viewModal = (g) => {
    setmodalGrade(g);
    setisModalOpen(true);
    setupdatingItem(g.grade);
  };
  const setGradeUpdate = (g) => {
    setmodalGrade({ ...modalGrade, membershipFee: g });
  };
  const updateGrade = async () => {
    console.log("Updated Grade", modalGrade);
    await updateGradeS(modalGrade);
    const records = await getGrades();
    setgrades(records);
    setupdatingItem("");
    setisModalOpen(false);
  };

  const onCancel = () => {
    setupdatingItem("");
    setisModalOpen(false);
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
        Membership Grades
      </h4>
      <div className="mt-5">
        <div className="row ml-3">
          <div className="mr-3">Add New Grade</div>
          <input
            onChange={addChange}
            value={grade}
            name="grade"
            className="form-control col-4"
            type="text"
          />
          <div className="mr-3 ml-3">Membership Fee</div>
          <input
            onChange={addChange}
            value={membershipFee}
            name="key"
            className="form-control col-3"
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
        <center className="mt-5 mr-5">
          <ul>
            {grades.length > 0 &&
              grades.map((g) => {
                return (
                  <div className="row" key={g.grade}>
                    <div className="col-1"></div>
                    <h4 className={isModalOpen ? "col-5" : "col-7"}>
                      {g.grade} - Rs. {g.membershipFee}{" "}
                    </h4>
                    {updatingItem == g.grade && (
                      <>
                        <div className="col-3">
                          <span className="font-weight-bold">{g.grade}</span>

                          <input
                            onChange={(e) => setGradeUpdate(e.target.value)}
                            name="key"
                            value={modalGrade.membershipFee}
                            className="form-control"
                            type="text"
                          />
                        </div>
                        <div className="col-1 mt-4">
                          <button
                            style={buttonStyle}
                            onClick={() => updateGrade()}
                            className="btn btn-outline-primary pl-3 pr-3"
                          >
                            Save
                          </button>
                        </div>
                      </>
                    )}
                    {updatingItem == g.grade && (
                      <button
                        style={buttonStyle}
                        onClick={onCancel}
                        className="col-1 btn btn-secondary mb-5"
                      >
                        Cancel
                      </button>
                    )}
                    {updatingItem != g.grade && (
                      <button
                        style={buttonStyle}
                        onClick={() => viewModal(g)}
                        className="col-1 btn btn-warning mb-5"
                      >
                        Update
                      </button>
                    )}
                  </div>
                );
              })}
          </ul>
        </center>
      </div>
    </>
  );
}

export default Grades;
