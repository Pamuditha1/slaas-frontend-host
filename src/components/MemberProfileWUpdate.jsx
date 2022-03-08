import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "../css/updateButtonStyle.css";

import ViewImage from "./ViewImage";
import PaymentsHistory from "./PaymentsHistory";

import { terminateMember } from "../services/terminateMemberService";
import { getMemberProfile } from "../services/getMemberProfile";
import { getMembershipBack } from "../services/getBackTermination";
import { updateMember } from "../services/updateMemberProfileData";

export const MemberProfileWUpdate = (props) => {
  const [memberData, setMemberData] = useState({});
  const [academicData, setAcademicData] = useState([]);
  const [proposer, setProposer] = useState({});
  const [seconder, setSeconder] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [commityData, setcommityData] = useState([]);

  const [enableEdit, setenableEdit] = useState(false);
  const [isModalOpen, setisModalOpen] = useState("");
  const [dataToUpdate, setdataToUpdate] = useState({});

  async function fetchProfile() {
    setIsLoading(true);
    const profileData = await getMemberProfile(props.match.params.id);
    setMemberData(profileData.member);
    setAcademicData(profileData.academic);
    setProposer(profileData.proposer);
    setSeconder(profileData.seconder);
    setcommityData(profileData.committies);
    setIsLoading(false);
  }
  useEffect(() => {
    fetchProfile();
  }, [props.match.params.id]);

  const setUpdate = (name, value) => {
    setdataToUpdate({
      name: name,
      value: value,
    });
    setisModalOpen(name);
  };
  const onUpdateChange = (e) => {
    setdataToUpdate({ ...dataToUpdate, value: e.target.value });
  };
  const saveUpdate = async () => {
    let data = {
      name: dataToUpdate.name,
      value: dataToUpdate.value,
      id: memberData.memberID,
    };
    await updateMember(data);
    fetchProfile();
    setdataToUpdate({});
    setisModalOpen(false);
    setenableEdit(false);
  };

  const {
    memberID,
    image,
    membershipNo,
    gradeOfMembership,
    section,
    status,
    dot,
    enrollDate,
    title,
    nameWinitials,
    fullName,
    commonFirst,
    commomLast,
    gender,
    dob,
    nic,
    mobileNo,
    fixedNo,
    email,
    resAddrs,
    perAddrs,
    sendingAddrs,
    designation,
    department,
    placeOfWork,
    offMobile,
    offLand,
    offFax,
    offEmail,
    offAddrs,
    memberBefore,
    memberFrom,
    memberTo,
    profession,
    specialization1,
    specialization2,
    specialization3,
    specialization4,
    specialization5,
  } = memberData;
  // const enrolledDate = Date(`${enrollDate}`).toLocaleDateString()
  const displayMembershipNo = `${membershipNo}/${section}`;

  async function terminateOnClick(membershipNo) {
    await terminateMember(membershipNo);
    fetchProfile();

    return;
  }
  async function getBackOnClick(memberID) {
    await getMembershipBack(memberID);
    fetchProfile();
    return;
  }
  const headStyle = {
    textShadow: "0px 0px 1px #111111",
  };

  const subheadStyle = {
    //backgroundColor: "#002263",
    backgroundColor: "#580b0d",
    borderRadius: "20px",
    boxShadow: "0px 5px 5px grey",
    color: "white",
  };

  const buttonStyle = {
    boxShadow: "0px 5px 10px grey",
    fontWeight: "bold",
    borderRadius: "40px",
  };

  const buttonStyleU = {
    boxShadow: "0px 5px 10px grey",
    fontWeight: "bold",
    borderRadius: "40px",
  };
  const buttonStyleUNotDisplay = {
    boxShadow: "0px 5px 10px grey",
    fontWeight: "bold",
    borderRadius: "40px",
    display: "none",
  };

  return isLoading ? (
    <Loader
      style={{ marginLeft: "35%" }}
      type="ThreeDots"
      color="#8f2032"
      height={300}
      width={300}
    />
  ) : (
    <div className="container">
      <div className="row" id="main">
        <h4 className="col-12 mt-5 mb-5 text-center" style={headStyle}>
          Member Profile
        </h4>
        <div className="col-12 mb-5">
          <div className="row">
            <div className="col-4"></div>
            {!enableEdit && <div className="col-4"></div>}
            {status == "Member" ? (
              <div
                className="col-4 text-right"
                style={{ display: !enableEdit && "none" }}
              >
                <button
                  style={buttonStyle}
                  onClick={() => terminateOnClick(membershipNo)}
                  className="btn btn-danger float-right"
                >
                  Terminate Member
                </button>
              </div>
            ) : (
              <div className="col-4" style={{ display: !enableEdit && "none" }}>
                <button
                  style={buttonStyle}
                  onClick={() => getBackOnClick(membershipNo)}
                  className="btn btn-success float-right"
                >
                  Continue Membership
                </button>
              </div>
            )}
            <div className="col-4">
              <button
                style={buttonStyle}
                className="btn btn-warning float-right"
                onClick={() => setenableEdit(!enableEdit)}
              >
                Update Member
              </button>
            </div>
          </div>
        </div>
        <div className="col-2 mr-5">
          <ViewImage nic={nic} image={image} />
        </div>
        <div className="col-5" id="personalData">
          <p className="row">
            Name with Initials :{" "}
            <strong className="row ml-5">
              {title} {nameWinitials}
            </strong>
          </p>
          <p className="row">
            NIC : <strong className="row ml-5">{nic}</strong>
          </p>
          <p className="row">
            Email : <strong className="row ml-5">{email}</strong>
          </p>
          <p className="row">
            Mobile No : <strong className="row ml-5">{mobileNo}</strong>
          </p>
          <p className="row">
            Preffered Address :{" "}
            <strong className="row ml-5">{sendingAddrs}</strong>
          </p>
        </div>
        <div className="col-4" id="membershipData">
          <p className="row">
            Membership No:{" "}
            <strong className="row ml-5">{displayMembershipNo}</strong>
          </p>
          <p className="row">
            Member Status:
            {status == "Terminated" ? (
              <div>
                <strong className="ml-5" style={{ color: "red" }}>
                  {status}{" "}
                </strong>
                <p className="row">
                  DOT :{" "}
                  <strong className="ml-2">
                    {new Date(dot).toLocaleDateString()}
                  </strong>
                </p>
              </div>
            ) : (
              <strong className="ml-5">{status} </strong>
            )}
          </p>
          <p className="row">
            Grade of Membership :{" "}
            <strong className="row ml-3">{gradeOfMembership}</strong>
          </p>
          <p className="row">
            Section: <strong className="row ml-5">{section}</strong>
          </p>
          <p className="row">
            Date of Enrolment:{" "}
            <strong className="row ml-5">{enrollDate}</strong>
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-2 mr-5"></div>
        <div className="col-9">
          Committiee :
          {commityData.length > 0 &&
            commityData.map((c) => {
              return (
                <p className="col-12" key={c.id}>
                  <strong className="row ml-3">
                    {c.committee} - {c.position} -{" "}
                    {new Date(c.fromD).toLocaleDateString()} -{" "}
                    {new Date(c.toD).toLocaleDateString()}
                  </strong>
                </p>
              );
            })}
        </div>
      </div>

      <div className="row" id="personal">
        <h6
          style={subheadStyle}
          className="col-12 pl-5 pt-2 pb-2 mt-5 mr-3 mb-5"
        >
          Personal Details
        </h6>
        <p className="col-3">Name with Initials : </p>
        <strong className="col-9">
          {title} {nameWinitials}{" "}
        </strong>
        <p className="col-3">Name in Full : </p>
        <strong className="col-9">{fullName}</strong>
        <p className="col-3">Name in Common Use : </p>
        <strong className="col-9">
          {commonFirst} {commomLast}{" "}
        </strong>
        <p className="col-3">Gender : </p>
        <strong className="col-9">{gender}</strong>
        <p className="col-3">NIC : </p>
        <strong className="col-9">{nic}</strong>
        <p className="col-3">Date of Birth : </p>
        <strong className="col-9">{new Date(dob).toLocaleDateString()}</strong>
        <p className="col-3">Residence Address : </p>
        <strong className="col-9">
          {resAddrs}
          <span className="ml-3">
            <button
              onClick={() => setUpdate("resAddrs", resAddrs)}
              className="btn btn-outline-warning"
              style={enableEdit ? buttonStyleU : buttonStyleUNotDisplay}
            >
              <FontAwesomeIcon icon={faEdit} size="xs" />
            </button>
            <input
              className="ml-3 "
              value={dataToUpdate.value}
              onChange={onUpdateChange}
              style={{ display: isModalOpen != "resAddrs" && "none" }}
            />
            <button
              onClick={saveUpdate}
              className="btn btn-primary ml-2"
              style={{ display: isModalOpen != "resAddrs" && "none" }}
            >
              Update
            </button>
          </span>
        </strong>
        {perAddrs && (
          <>
            <p className="col-3">Permanent Address : </p>
            <strong className="col-9">
              {perAddrs}
              <span className="ml-3">
                <button
                  onClick={() => setUpdate("perAddrs", perAddrs)}
                  className="btn btn-outline-warning"
                  style={enableEdit ? buttonStyleU : buttonStyleUNotDisplay}
                >
                  <FontAwesomeIcon icon={faEdit} size="xs" />
                </button>
                <input
                  className="ml-3 "
                  value={dataToUpdate.value}
                  onChange={onUpdateChange}
                  style={{ display: isModalOpen != "perAddrs" && "none" }}
                />
                <button
                  onClick={saveUpdate}
                  className="btn btn-primary ml-2"
                  style={{ display: isModalOpen != "perAddrs" && "none" }}
                >
                  Update
                </button>
              </span>
            </strong>{" "}
          </>
        )}
        <p className="col-3">Mobile No : </p>
        <strong className="col-9">
          {mobileNo}
          <span className="ml-3">
            <button
              onClick={() => setUpdate("mobileNo", mobileNo)}
              className="btn btn-outline-warning"
              style={enableEdit ? buttonStyleU : buttonStyleUNotDisplay}
            >
              <FontAwesomeIcon icon={faEdit} size="xs" />
            </button>
            <input
              className="ml-3 "
              value={dataToUpdate.value}
              onChange={onUpdateChange}
              style={{ display: isModalOpen != "mobileNo" && "none" }}
            />
            <button
              onClick={saveUpdate}
              className="btn btn-primary ml-2"
              style={{ display: isModalOpen != "mobileNo" && "none" }}
            >
              Update
            </button>
          </span>
        </strong>
        <p className="col-3">Fixed No : </p>
        <strong className="col-9">
          {fixedNo}
          <span className="ml-3">
            <button
              onClick={() => setUpdate("fixedNo", fixedNo)}
              className="btn btn-outline-warning"
              style={enableEdit ? buttonStyleU : buttonStyleUNotDisplay}
            >
              <FontAwesomeIcon icon={faEdit} size="xs" />
            </button>
            <input
              className="ml-3 "
              value={dataToUpdate.value}
              onChange={onUpdateChange}
              style={{ display: isModalOpen != "fixedNo" && "none" }}
            />
            <button
              onClick={saveUpdate}
              className="btn btn-primary ml-2"
              style={{ display: isModalOpen != "fixedNo" && "none" }}
            >
              Update
            </button>
          </span>
        </strong>
        <p className="col-3">Email : </p>
        <strong className="col-9">
          {email}
          <span className="ml-3">
            <button
              onClick={() => setUpdate("email", email)}
              className="btn btn-outline-warning"
              style={enableEdit ? buttonStyleU : buttonStyleUNotDisplay}
            >
              <FontAwesomeIcon icon={faEdit} size="xs" />
            </button>
            <input
              className="ml-3 "
              value={dataToUpdate.value}
              onChange={onUpdateChange}
              style={{ display: isModalOpen != "email" && "none" }}
            />
            <button
              onClick={saveUpdate}
              className="btn btn-primary ml-2"
              style={{ display: isModalOpen != "email" && "none" }}
            >
              Update
            </button>
          </span>
        </strong>
      </div>

      <div className="row" id="official">
        <h6
          style={subheadStyle}
          className="col-12 pl-5 pt-2 pb-2 mt-5 mr-3 mb-5"
        >
          Official Details
        </h6>
        <p className="col-3">Designation : </p>
        <strong className="col-9">
          {designation}
          <span className="ml-3">
            <button
              onClick={() => setUpdate("designation", designation)}
              className="btn btn-outline-warning"
              style={enableEdit ? buttonStyleU : buttonStyleUNotDisplay}
            >
              <FontAwesomeIcon icon={faEdit} size="xs" />
            </button>
            <input
              className="ml-3 "
              value={dataToUpdate.value}
              onChange={onUpdateChange}
              style={{ display: isModalOpen != "designation" && "none" }}
            />
            <button
              onClick={saveUpdate}
              className="btn btn-primary ml-2"
              style={{ display: isModalOpen != "designation" && "none" }}
            >
              Update
            </button>
          </span>
        </strong>
        <p className="col-3">Division/Department : </p>
        <strong className="col-9">
          {department}
          <span className="ml-3">
            <button
              onClick={() => setUpdate("department", department)}
              className="btn btn-outline-warning"
              style={enableEdit ? buttonStyleU : buttonStyleUNotDisplay}
            >
              <FontAwesomeIcon icon={faEdit} size="xs" />
            </button>
            <input
              className="ml-3 "
              value={dataToUpdate.value}
              onChange={onUpdateChange}
              style={{ display: isModalOpen != "department" && "none" }}
            />
            <button
              onClick={saveUpdate}
              className="btn btn-primary ml-2"
              style={{ display: isModalOpen != "department" && "none" }}
            >
              Update
            </button>
          </span>
        </strong>
        <p className="col-3">Place of Work : </p>
        <strong className="col-9">
          {placeOfWork}
          <span className="ml-3">
            <button
              onClick={() => setUpdate("placeOfWork", placeOfWork)}
              className="btn btn-outline-warning"
              style={enableEdit ? buttonStyleU : buttonStyleUNotDisplay}
            >
              <FontAwesomeIcon icon={faEdit} size="xs" />
            </button>
            <input
              className="ml-3 "
              value={dataToUpdate.value}
              onChange={onUpdateChange}
              style={{ display: isModalOpen != "placeOfWork" && "none" }}
            />
            <button
              onClick={saveUpdate}
              className="btn btn-primary ml-2"
              style={{ display: isModalOpen != "placeOfWork" && "none" }}
            >
              Update
            </button>
          </span>
        </strong>
        <p className="col-3">Office Address : </p>
        <strong className="col-9">
          {offAddrs}
          <span className="ml-3">
            <button
              onClick={() => setUpdate("offAddrs", offAddrs)}
              className="btn btn-outline-warning"
              style={enableEdit ? buttonStyleU : buttonStyleUNotDisplay}
            >
              <FontAwesomeIcon icon={faEdit} size="xs" />
            </button>
            <input
              className="ml-3 "
              value={dataToUpdate.value}
              onChange={onUpdateChange}
              style={{ display: isModalOpen != "offAddrs" && "none" }}
            />
            <button
              onClick={saveUpdate}
              className="btn btn-primary ml-2"
              style={{ display: isModalOpen != "offAddrs" && "none" }}
            >
              Update
            </button>
          </span>
        </strong>
        <p className="col-3">Office Mobile No : </p>
        <strong className="col-9">
          {offMobile}
          <span className="ml-3">
            <button
              onClick={() => setUpdate("offMobile", offMobile)}
              className="btn btn-outline-warning"
              style={enableEdit ? buttonStyleU : buttonStyleUNotDisplay}
            >
              <FontAwesomeIcon icon={faEdit} size="xs" />
            </button>
            <input
              className="ml-3 "
              value={dataToUpdate.value}
              onChange={onUpdateChange}
              style={{ display: isModalOpen != "offMobile" && "none" }}
            />
            <button
              onClick={saveUpdate}
              className="btn btn-primary ml-2"
              style={{ display: isModalOpen != "offMobile" && "none" }}
            >
              Update
            </button>
          </span>
        </strong>
        <p className="col-3">Office Fixed No : </p>
        <strong className="col-9">
          {offLand}
          <span className="ml-3">
            <button
              onClick={() => setUpdate("offLand", offLand)}
              className="btn btn-outline-warning"
              style={enableEdit ? buttonStyleU : buttonStyleUNotDisplay}
            >
              <FontAwesomeIcon icon={faEdit} size="xs" />
            </button>
            <input
              className="ml-3 "
              value={dataToUpdate.value}
              onChange={onUpdateChange}
              style={{ display: isModalOpen != "offLand" && "none" }}
            />
            <button
              onClick={saveUpdate}
              className="btn btn-primary ml-2"
              style={{ display: isModalOpen != "offLand" && "none" }}
            >
              Update
            </button>
          </span>
        </strong>
        <p className="col-3">Office Fax : </p>
        <strong className="col-9">
          {offFax}
          <span className="ml-3">
            <button
              onClick={() => setUpdate("offFax", offFax)}
              className="btn btn-outline-warning"
              style={enableEdit ? buttonStyleU : buttonStyleUNotDisplay}
            >
              <FontAwesomeIcon icon={faEdit} size="xs" />
            </button>
            <input
              className="ml-3 "
              value={dataToUpdate.value}
              onChange={onUpdateChange}
              style={{ display: isModalOpen != "offFax" && "none" }}
            />
            <button
              onClick={saveUpdate}
              className="btn btn-primary ml-2"
              style={{ display: isModalOpen != "offFax" && "none" }}
            >
              Update
            </button>
          </span>
        </strong>
        <p className="col-3">Official Email : </p>
        <strong className="col-9">
          {offEmail}
          <span className="ml-3">
            <button
              onClick={() => setUpdate("offEmail", offEmail)}
              className="btn btn-outline-warning"
              style={enableEdit ? buttonStyleU : buttonStyleUNotDisplay}
            >
              <FontAwesomeIcon icon={faEdit} size="xs" />
            </button>
            <input
              className="ml-3 "
              value={dataToUpdate.value}
              onChange={onUpdateChange}
              style={{ display: isModalOpen != "offEmail" && "none" }}
            />
            <button
              onClick={saveUpdate}
              className="btn btn-primary ml-2"
              style={{ display: isModalOpen != "offEmail" && "none" }}
            >
              Update
            </button>
          </span>
        </strong>
      </div>

      <div className="row" id="professional">
        <h6
          style={subheadStyle}
          className="col-12 pl-5 pt-2 pb-2 mt-5 mr-3 mb-5"
        >
          Professional Details
        </h6>
        <p className="col-3">Profession : </p>
        <strong className="col-9">
          {profession}
          <span className="ml-3">
            <button
              onClick={() => setUpdate("profession", profession)}
              className="btn btn-outline-warning"
              style={enableEdit ? buttonStyleU : buttonStyleUNotDisplay}
            >
              <FontAwesomeIcon icon={faEdit} size="xs" />
            </button>
            <input
              className="ml-3"
              value={dataToUpdate.value}
              onChange={onUpdateChange}
              style={{ display: isModalOpen != "profession" && "none" }}
            />
            <button
              onClick={saveUpdate}
              className="btn btn-primary ml-2"
              style={{ display: isModalOpen != "profession" && "none" }}
            >
              Update
            </button>
          </span>
        </strong>

        <p className="col-3">Fields of Specialization : </p>
        <div className="col-9">
          <strong>{specialization1}</strong>
          <strong>{specialization2}</strong>
          <strong>{specialization3}</strong>
          <strong>{specialization4}</strong>
          <strong>{specialization5}</strong>
        </div>
        <p className="col-3">Academic Qualifications : </p>
        <div className="col-9">
          {academicData.map((field) => {
            return (
              <div className="col-12" key={field.year}>
                <strong>
                  {field.year} - {field.degree} - {field.disciplines} -{" "}
                  {field.university}
                </strong>
              </div>
            );
          })}
        </div>
      </div>

      <div className="row" id="membership">
        <h6
          style={subheadStyle}
          className="col-12 pl-5 pt-2 pb-2 mt-5 mr-3 mb-5"
        >
          Membership Details
        </h6>
        <p className="col-3">Membership No : </p>
        <strong className="col-9">{displayMembershipNo}</strong>
        <p className="col-3">Grade of Membership : </p>
        <strong className="col-9">{gradeOfMembership}</strong>
        <p className="col-3">Section: </p>
        <strong className="col-9">{section}</strong>
        {memberBefore && (
          <>
            <p className="col-3">Member Before </p>
            <p className="col-2">From : </p>
            <strong className="col-2">{memberFrom}</strong>
            <p className="col-2">To : </p>
            <strong className="col-2">{memberTo}</strong>
          </>
        )}
        <p className="col-5 ">Address to which correspondences should be : </p>
        <strong className="col-7">
          {sendingAddrs} {sendingAddrs ? "Address" : null}{" "}
        </strong>
        <div className="col-6">
          <p className="col-12 ml-5">- Proposer - </p>
          <div className="row col-12">
            <p className="col-3">Name : </p>
            <strong className="col-9">{proposer.name}</strong>
          </div>
          <div className="row col-12">
            <p className="col-3">Membership No : </p>
            <strong className="col-9">{proposer.membershipNo}</strong>
          </div>
          <div className="row col-12">
            <p className="col-3">Address : </p>
            <strong className="col-9">{proposer.address}</strong>
          </div>
          <div className="row col-12">
            <p className="col-3">Contact No : </p>
            <strong className="col-9">{proposer.contactNo}</strong>
          </div>
        </div>
        <div className="col-6" id="1234">
          <p className="col-12 ml-5">- Seconder -</p>
          <div className="row col-12">
            <p className="col-3">Name : </p>
            <strong className="col-9">{seconder.name}</strong>
          </div>
          <div className="row col-12">
            <p className="col-3">Membership No : </p>
            <strong className="col-9">{seconder.membershipNo}</strong>
          </div>
          <div className="row col-12">
            <p className="col-3">Address : </p>
            <strong className="col-9">{seconder.address}</strong>
          </div>
          <div className="row col-12">
            <p className="col-3">Contact No : </p>
            <strong className="col-9">{seconder.contactNo}</strong>
          </div>
        </div>
      </div>

      <div className="row" id="paymentRecords">
        <PaymentsHistory memberID={memberID} memNo={props.match.params.id} />
      </div>

      <div className="row mt-5">
        <div className="col-4"></div>
        {!enableEdit && <div className="col-4"></div>}
        {status == "Member" ? (
          <div
            className="col-4 text-right"
            style={{ display: !enableEdit && "none" }}
          >
            <button
              style={buttonStyle}
              onClick={() => terminateOnClick(membershipNo)}
              className="btn btn-danger float-right"
            >
              Terminate Member
            </button>
          </div>
        ) : (
          <div className="col-4" style={{ display: !enableEdit && "none" }}>
            <button
              style={buttonStyle}
              onClick={() => getBackOnClick(membershipNo)}
              className="btn btn-success float-right"
            >
              Continue Membership
            </button>
          </div>
        )}
        <div className="col-4">
          <button
            style={buttonStyle}
            className="btn btn-warning float-right"
            onClick={() => setenableEdit(!enableEdit)}
          >
            Update Member
          </button>
        </div>
      </div>

      <div className="mb-5"></div>
    </div>
  );
};
