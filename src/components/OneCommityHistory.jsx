import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";

import { getCommMembersHistory } from "../services/getCommityHistory";

function OneCommityHistory({ comm }) {
  const [dateRanges, setdateRanges] = useState([]);
  const [members, setmembers] = useState([]);

  useEffect(() => {
    async function fetchSections() {
      const records = await getCommMembersHistory(comm);
      setdateRanges(records.ranges);
      setmembers(records.members);
    }
    fetchSections();
  }, [comm]);

  const subheadStyle = {
    //backgroundColor: "#002263",
    backgroundColor: "#580b0d",
    borderRadius: "20px",
    boxShadow: "0px 5px 5px grey",
    color: "white",
  };

  const timeheadStyle = {
    backgroundColor: "#69706b",
    borderRadius: "20px",
    boxShadow: "0px 5px 5px grey",
    color: "white",
  };

  const buttonStyle = {
    boxShadow: "0px 5px 10px grey",
    fontWeight: "bold",
    borderRadius: "40px",
  };

  return (
    <div>
      <div className="row">
        <div className="col-12 mt-5">
          <h6 style={subheadStyle} className="pt-2 pb-2 m-5 text-center">
            Former {comm}
          </h6>
        </div>
        {dateRanges &&
          dateRanges.map((r) => {
            let membersF = members.filter((m) => {
              if (m.fromD == r.fromD) return true;
            });
            return (
              <div className="container mt-5">
                <p
                  className="row pt-1 pb-1 pl-5 font-weight-bold"
                  style={timeheadStyle}
                >
                  From {new Date(r.fromD).toLocaleDateString()} To{" "}
                  {new Date(r.toD).toLocaleDateString()}
                </p>
                <Table borderless className="mt-3 text-center">
                  <thead>
                    <tr>
                      <th>Position</th>
                      <th>Membership No</th>
                      <th>Member Name</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {membersF.length > 0 &&
                      membersF.map((m) => {
                        return (
                          <tr key={m.id}>
                            <td>{m.position}</td>
                            <td>{m.membershipNo}</td>
                            <td>{m.name}</td>
                            <td>
                              <Link
                                to={`/user/member/profile/${m.membershipNo}`}
                                target="_blank"
                              >
                                <button
                                  style={buttonStyle}
                                  className="btn btn-outline-dark"
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
          })}
      </div>
    </div>
  );
}

export default OneCommityHistory;
