import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { DatePicker } from "react-rainbow-components";
import { Link } from "react-router-dom";

import { getCommMembers } from "../services/getCommMembers";
import { getMemberToSet } from "../services/getMemberToSetCommity";
import { addNewCommityPosition } from "../services/setNewCommityPositions";
import { updateCommityPosition } from "../services/updateCommMembers";

function OneCommittee({ comm }) {
  const [commMembers, setcommMembers] = useState([]);
  const [newMember, setnewMember] = useState({
    position: "",
    from: "",
    to: "",
    membershipNo: "",
    name: "",
  });
  const [memData, setmemData] = useState({});
  const [isUpdating, setisUpdating] = useState(false);

  useEffect(() => {
    async function fetchSections() {
      const records = await getCommMembers(comm);
      setcommMembers(records);
      setnewMember({
        position: "",
        from: "",
        to: "",
        membershipNo: "",
        name: "",
      });
    }
    fetchSections();
  }, [comm]);

  const getName = async (e) => {
    if (e.key === "Enter") {
      const result = await getMemberToSet(e.target.value);
      setmemData(result);
      setnewMember({
        ...newMember,
        name: result.nameWinitials,
      });
    }
  };

  const addChange = (e) => {
    setnewMember({
      ...newMember,
      [e.target.name]: e.target.value,
    });
  };
  const setDates = (name, date) => {
    setnewMember({
      ...newMember,
      [name]: date,
    });
  };

  const updateSet = (m) => {
    setnewMember({
      position: m.position,
      from: m.fromD,
      to: m.toD,
      membershipNo: m.membershipNo,
      name: m.name,
    });
    setisUpdating(true);
  };

  const onAdd = async () => {
    await addNewCommityPosition({
      committe: comm,
      position: newMember.position,
      fromD: newMember.from,
      toD: newMember.to,
      memberID: memData.memberID,
      name: memData.nameWinitials,
      membershipNo: memData.membershipNo,
    });
    setcommMembers([...commMembers, newMember]);
    setnewMember({
      position: "",
      from: "",
      to: "",
      membershipNo: "",
      name: "",
    });
  };

  const onUpdate = async () => {
    await updateCommityPosition({
      committe: comm,
      position: newMember.position,
      fromD: newMember.from,
      toD: newMember.to,
      memberID: memData.memberID,
      name: memData.nameWinitials,
      membershipNo: memData.membershipNo,
    });
    setcommMembers(await getCommMembers(comm));
    setnewMember({
      position: "",
      from: "",
      to: "",
      membershipNo: "",
      name: "",
    });
    setisUpdating(false);
  };

  const onCancel = () => {
    setnewMember({
      position: "",
      from: "",
      to: "",
      membershipNo: "",
      name: "",
    });
    setisUpdating(false);
  };

  const subheadStyle = {
    backgroundColor: "#002263",
    borderRadius: "20px",
    boxShadow: "0px 5px 5px grey",
    color: "white",
  };
  const buttonStyleC = {
    boxShadow: "0px 5px 10px grey",
    fontWeight: "bold",
    backgroundColor: "#005336",
    borderRadius: "40px",
  };
  const buttonStyleU = {
    boxShadow: "0px 5px 10px grey",
    fontWeight: "bold",
    backgroundColor: "#fdd30f",
    borderRadius: "40px",
  };
  const buttonStyle = {
    boxShadow: "0px 5px 10px grey",
    fontWeight: "bold",
    borderRadius: "40px",
  };

  return (
    <div>
      <h6 style={subheadStyle} className="pl-5 pt-2 pb-2 m-5">
        {comm}
      </h6>

      <h5 className="mb-5 mt-5 text-center font-weight-bold">
        Assign New Position
      </h5>
      <div className="row">
        <div className="col-6">
          Position
          <input
            onChange={addChange}
            value={newMember.position}
            name="position"
            className="form-control"
            type="text"
            readOnly={isUpdating}
          />
        </div>
        <div className="col-6">
          <div className="row">
            <div className="col-6">
              From
              <DatePicker
                id="from"
                formatStyle="medium"
                value={newMember.from}
                onChange={(value) => setDates("from", value.toISOString())}
              />
            </div>

            <div className="col-6">
              To
              <DatePicker
                id="to"
                formatStyle="medium"
                value={newMember.to}
                onChange={(value) => setDates("to", value.toISOString())}
              />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="row">
            <div className="col-5">
              Membership No
              <input
                onChange={addChange}
                onKeyDown={getName}
                value={newMember.membershipNo}
                name="membershipNo"
                className="form-control"
                type="text"
              />
            </div>

            <div className="col-4">
              Name
              <input
                onChange={addChange}
                value={newMember.name}
                name="name"
                className="form-control"
                type="text"
              />
            </div>
            {!isUpdating ? (
              <button
                onClick={onAdd}
                style={buttonStyleC}
                className="btn btn-success col-2 mt-3"
              >
                Save
              </button>
            ) : (
              <>
                <button
                  style={buttonStyle}
                  onClick={onCancel}
                  className="btn btn-secondary col-1 mt-3 mr-3"
                >
                  Cancel
                </button>
                <button
                  style={buttonStyleU}
                  onClick={onUpdate}
                  className="btn btn-warning col-1 mt-3"
                >
                  Update
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <h5 className="mb-5 mt-5 text-center font-weight-bold">
        Committee Members
      </h5>
      <Table borderless className="mt-5 text-center">
        <thead>
          <tr>
            <th>Position</th>
            <th>From</th>
            <th>To</th>
            <th>Membership No</th>
            <th>Member Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {commMembers.length > 0 &&
            commMembers.map((m) => {
              return (
                <tr key={m.id}>
                  <td>{m.position}</td>
                  <td>{new Date(m.fromD).toLocaleDateString()}</td>
                  <td>{new Date(m.toD).toLocaleDateString()}</td>
                  <td>{m.membershipNo}</td>
                  <td>{m.name}</td>
                  <td>
                    <button
                      style={buttonStyle}
                      onClick={() => updateSet(m)}
                      className="btn btn-outline-warning"
                    >
                      Update
                    </button>
                    <Link
                      to={`/user/member/profile/${m.membershipNo}`}
                      target="_blank"
                    >
                      <button
                        style={buttonStyle}
                        className="btn btn-outline-primary ml-3"
                      >
                        Profile
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}

export default OneCommittee;
