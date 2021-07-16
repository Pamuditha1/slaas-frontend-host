import React, { useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { api } from "../../services/api";

function Proposer(props) {
  const [loading, setLoading] = useState(false);
  const [viewData, setViewData] = useState({
    name: "",
    memNo: "",
    address: "",
    contactNo: "",
  });
  const [searchWord, setSearchWord] = useState("");
  const [searchedResults, setsearchedResults] = useState([]);

  const onSearch = async () => {
    setLoading(true);
    console.log("On Change Called");
    setViewData({
      name: "",
      memNo: "",
      address: "",
      contactNo: "",
    });
    props.setProposer({
      name: "",
      memNo: "",
      address: "",
      contactNo: "",
    });

    const fetchData = () => {
      axios(`${api}/user/refrees/${searchWord}`)
        .then(function (res) {
          console.log("Proposer Data", res.data);
          console.log(typeof res.data);
          const receivedData = {
            name: res.data.nameWinitials,
            address: res.data.resAddrs,
            contactNo: res.data.mobileNo,
            memNo: res.data.membershipNo,
          };
          setViewData(receivedData);
          setsearchedResults(res.data ? res.data : []);
          props.setProposer(receivedData);
        })
        .then(function () {
          console.log("Added Proposer Data", props.proposer);
        });
    };
    await fetchData();
    console.log("Added Proposer Data", props.proposer);
    setLoading(false);
  };

  const onChange = (e) => {
    setViewData({ ...viewData, [e.target.name]: e.target.value });

    props.setProposer({ ...viewData, [e.target.name]: e.target.value });

    console.log(props.proposer);
  };
  const buttonStyle = {
    boxShadow: "0px 5px 10px grey",
    fontWeight: "bold",
    borderRadius: "50px",
  };

  return (
    <div>
      <label className="ml-5">Proposer</label>

      <div id="search" className="row">
        <div className="input-group col-12">
          <div className="form-outline col-8">
            <input
              type="search"
              id="searchMember"
              onChange={(e) => setSearchWord(e.target.value)}
              value={searchWord}
              className="form-control"
              placeholder="Search ..."
            />
          </div>
          <button
            style={buttonStyle}
            type="button"
            onClick={onSearch}
            className="btn btn-primary"
          >
            <FontAwesomeIcon icon={faSearch} size="1x" />
          </button>
          <span className="col-2">
            {loading && (
              <Loader type="TailSpin" color="blue" height={30} width={30} />
            )}
          </span>
        </div>
        <h6 className="ml-5 mt-3">
          {searchedResults.length == 0 ? "No member found." : ""}
        </h6>
      </div>

      <div className="row form-group">
        <label className="col-4">Membership No</label>
        <input
          className="col-7 form-control"
          onChange={onChange}
          value={viewData.memNo}
          name="memNo"
        />
      </div>
      <div className="row form-group">
        <label className="col-4">Name</label>
        <input
          className="col-7 form-control"
          onChange={onChange}
          value={viewData.name}
          name="name"
        />
      </div>
      <div className="row form-group">
        <label className="col-4">Address</label>
        <input
          className="col-7 form-control"
          onChange={onChange}
          value={viewData.address}
          name="address"
        />
      </div>
      <div className="row form-group">
        <label className="col-4">Contact No</label>
        <input
          className="col-7 form-control"
          onChange={onChange}
          value={viewData.contactNo}
          name="contactNo"
        />
      </div>
    </div>
  );
}

export default Proposer;
