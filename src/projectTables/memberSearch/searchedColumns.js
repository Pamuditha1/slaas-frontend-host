import React from "react";
import { Link } from "react-router-dom";
import { ColumnFilter } from "../common/ColumnFilter";

export const COLUMNS = [
  {
    Header: "Profile",
    Cell: (props) => {
      const memberID = props.row.original.membershipNo
        ? props.row.original.membershipNo
        : props.row.original.nic;
      return (
        <Link to={`/user/member/profile/${memberID}`} target="_blank">
          <button className="btn btn-outline-primary">View</button>
        </Link>
      );
    },
  },
  {
    Header: "Title",
    accessor: "title",
    Filter: ColumnFilter,
    sortable: false,
    filterable: false,
  },
  {
    Header: "Name with Initials",
    accessor: "nameWinitials",
    Filter: ColumnFilter,
  },
  {
    Header: "Membership No",
    accessor: "membershipNo",
    Filter: ColumnFilter,
  },
  {
    Header: "Member Status",
    accessor: "status",
    Filter: ColumnFilter,
  },
  {
    Header: "Personal Email",
    accessor: "email",
    Filter: ColumnFilter,
  },
  {
    Header: "Section",
    accessor: "section",
    Filter: ColumnFilter,
  },
  {
    Header: "Grade of Membership",
    accessor: "gradeOfMembership",
    Filter: ColumnFilter,
  },
  {
    Header: "First Name",
    accessor: "commonFirst",
    Filter: ColumnFilter,
  },
  {
    Header: "Last Name",
    accessor: "commomLast",
    Filter: ColumnFilter,
  },
  {
    Header: "Gender",
    accessor: "gender",
    Filter: ColumnFilter,
  },
  {
    Header: "Date of Birth",
    accessor: "dob",
    Filter: ColumnFilter,
  },
  {
    Header: "NIC",
    accessor: "nic",
    Filter: ColumnFilter,
  },
  {
    Header: "Mobile No",
    accessor: "mobileNo",
    Filter: ColumnFilter,
  },
  {
    Header: "Fixed No",
    accessor: "fixedNo",
    Filter: ColumnFilter,
  },
  {
    Header: "Residence Address",
    accessor: "resAddrs",
    Filter: ColumnFilter,
  },
  {
    Header: "Permanent Address",
    accessor: "perAddrs",
    Filter: ColumnFilter,
  },

  {
    Header: "Enrolled Date",
    accessor: "enrollDate",
    Filter: ColumnFilter,
  },
  {
    Header: "Member Folio Number",
    accessor: "memberFolioNo",
    Filter: ColumnFilter,
  },
  {
    Header: "Designation",
    accessor: "designation",
    Filter: ColumnFilter,
  },
  {
    Header: "Department",
    accessor: "department",
    Filter: ColumnFilter,
  },
  {
    Header: "Place of Work",
    accessor: "placeOfWork",
    Filter: ColumnFilter,
  },
  {
    Header: "Official Contact(Mobile)",
    accessor: "offMobile",
    Filter: ColumnFilter,
  },
  {
    Header: "Official Contact(Fixed)",
    accessor: "offLand",
    Filter: ColumnFilter,
  },
  {
    Header: "Fax",
    accessor: "offFax",
    Filter: ColumnFilter,
  },
  {
    Header: "Official Email",
    accessor: "offEmail",
    Filter: ColumnFilter,
  },
  {
    Header: "Official Address",
    accessor: "offAddrs",
    Filter: ColumnFilter,
  },
  {
    Header: "Profession",
    accessor: "profession",
    Filter: ColumnFilter,
  },
  {
    Header: "Specialization 1",
    accessor: "specialization1",
    Filter: ColumnFilter,
  },
  {
    Header: "Specialization 2",
    accessor: "specialization2",
    Filter: ColumnFilter,
  },
  {
    Header: "Degree",
    accessor: "degree",
    Filter: ColumnFilter,
  },
  {
    Header: "University",
    accessor: "university",
    Filter: ColumnFilter,
  },
];
