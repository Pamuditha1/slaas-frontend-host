import React, { useState } from "react";
import { Sidenav, Dropdown, Nav, Icon } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";
import "../css/sideBar.css";
import { Link } from "react-router-dom";
import {
  faIdCard,
  faMoneyCheckAlt,
  faExclamationCircle,
  faUsers,
  faMoneyBill,
  faBan,
  faSignOutAlt,
  faUserTie,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SuiteSidebar() {
  const [clicked, setclicked] = useState("");

  const onClickStyle = {
    backgroundColor: "white",
    opacity: "0.7",
  };
  const s = {};
  const onClick = (e) => {
    setclicked(e.target.id);
  };

  const logout = (e) => {
    setclicked(e.target.id);
    localStorage.removeItem("token");
  };

  const style = {
    backgroundColor: "#111",
    textDecoration: "none",
    display: "block",
  };

  const linkColor = {
    color: "#818181",
    textDecoration: "none",
  };
  const onClickLink = {
    color: "black",
    fontWeight: "bold",
    textDecoration: "none",
  };

  const buttonStyle = {
    boxShadow: "0px 10px 10px black",
    fontWeight: "bold",
    borderRadius: "40px",
  };

  return (
    <div className="sidenav">
      <Sidenav defaultOpenKeys={["2"]} activeKey="1">
        <Sidenav.Body style={style}>
          <Nav>
            <Dropdown eventKey="2" title="Members" icon={<Icon icon="group" />}>
              <Dropdown.Item
                eventKey="2-1"
                style={clicked == "rm" ? onClickStyle : s}
              >
                <Link
                  to="/user/register-member"
                  style={clicked == "rm" ? onClickLink : linkColor}
                >
                  <span onClick={onClick} id="rm">
                    <FontAwesomeIcon
                      icon={faIdCard}
                      size="1x"
                      className="mr-2"
                    />
                    Register
                  </span>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="2-2"
                style={clicked == "members" ? onClickStyle : s}
              >
                <Link
                  to="/user/members"
                  style={clicked == "members" ? onClickLink : linkColor}
                >
                  <span onClick={onClick} id="members">
                    <FontAwesomeIcon
                      icon={faUsers}
                      size="1x"
                      className="mr-2"
                    />
                    View Members
                  </span>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="2-3"
                style={clicked == "outdated" ? onClickStyle : s}
              >
                <Link
                  to="/user/outdated-list"
                  style={clicked == "outdated" ? onClickLink : linkColor}
                >
                  <span onClick={onClick} id="outdated">
                    <FontAwesomeIcon
                      icon={faExclamationCircle}
                      size="1x"
                      className="mr-2"
                    />
                    Outdated
                  </span>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="2-3"
                style={clicked == "terminated" ? onClickStyle : s}
              >
                <Link
                  to="/user/terminated-list"
                  style={clicked == "terminated" ? onClickLink : linkColor}
                >
                  <span onClick={onClick} id="terminated">
                    <FontAwesomeIcon icon={faBan} size="1x" className="mr-2" />
                    Terminated
                  </span>
                </Link>
              </Dropdown.Item>
            </Dropdown>
            <Dropdown
              eventKey="3"
              title="Payments"
              icon={<Icon icon="money" />}
            >
              <Dropdown.Item
                eventKey="3-2"
                style={clicked == "payments" ? onClickStyle : s}
              >
                <Link
                  to="/user/payments/view"
                  style={clicked == "payments" ? onClickLink : linkColor}
                >
                  <span onClick={onClick} id="payments">
                    <FontAwesomeIcon
                      icon={faMoneyCheckAlt}
                      size="1x"
                      className="mr-2"
                    />
                    Payments
                  </span>
                </Link>
              </Dropdown.Item>
              <Dropdown.Menu
                eventKey="3-2"
                title="Receipt"
                icon={<Icon icon="file-text" />}
                style={clicked == "receipt" ? onClickStyle : s}
              >
                <Dropdown.Item
                  eventKey="3-2-1"
                  style={clicked == "receipt1" ? onClickStyle : s}
                >
                  <Link
                    to="/user/receipt/member"
                    style={clicked == "receipt1" ? onClickLink : linkColor}
                  >
                    <span onClick={onClick} id="receipt1">
                      <FontAwesomeIcon
                        icon={faUserTie}
                        size="1x"
                        className="mr-2"
                      />
                      Member
                    </span>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="3-2-2"
                  style={clicked == "receipt2" ? onClickStyle : s}
                >
                  <Link
                    to="/user/receipt/new"
                    style={clicked == "receipt2" ? onClickLink : linkColor}
                  >
                    <span onClick={onClick} id="receipt2">
                      <FontAwesomeIcon
                        icon={faUserPlus}
                        size="1x"
                        className="mr-2"
                      />
                      Applicant
                    </span>
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown
              eventKey="5"
              title="Committees"
              icon={<Icon icon="peoples-map" />}
            >
              <Dropdown.Item
                eventKey="5-1"
                style={clicked == "comity" ? onClickStyle : s}
              >
                <Link
                  to="/user/manage-committees"
                  style={clicked == "comity" ? onClickLink : linkColor}
                >
                  <span onClick={onClick} id="comity">
                    <FontAwesomeIcon
                      icon={faMoneyBill}
                      size="1x"
                      className="mr-2"
                    />
                    Manage Committees
                  </span>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="5-2"
                style={clicked == "comHis" ? onClickStyle : s}
              >
                <Link
                  to="/user/committees/history"
                  style={clicked == "comHis" ? onClickLink : linkColor}
                >
                  <span onClick={onClick} id="comHis">
                    <FontAwesomeIcon
                      icon={faMoneyCheckAlt}
                      size="1x"
                      className="mr-2"
                    />
                    Committees History
                  </span>
                </Link>
              </Dropdown.Item>
            </Dropdown>
            <Nav.Item
              eventKey="6"
              style={clicked == "mails" ? onClickStyle : s}
              icon={<Icon icon="envelope" />}
            >
              <Link
                to="/user/send-mails"
                style={clicked == "mails" ? onClickLink : linkColor}
              >
                <span onClick={onClick} id="mails">
                  Send Mails
                </span>
              </Link>
            </Nav.Item>
            <Nav.Item
              eventKey="7"
              style={clicked == "operations" ? onClickStyle : s}
              icon={<Icon icon="task" />}
            >
              <Link
                to="/user/operations"
                style={clicked == "operations" ? onClickLink : linkColor}
              >
                <span onClick={onClick} id="operations">
                  Operations
                </span>
              </Link>
            </Nav.Item>
            <Nav.Item
              eventKey="9"
              style={clicked == "settings" ? onClickStyle : s}
              icon={<Icon icon="cog" />}
            >
              <Link
                to="/user/settings"
                style={clicked == "settings" ? onClickLink : linkColor}
              >
                <span onClick={onClick} id="settings">
                  Settings
                </span>
              </Link>
            </Nav.Item>
            <Nav.Item
              eventKey="10"
              style={clicked == "logout" ? onClickStyle : s}
            >
              <Link
                to="/"
                style={clicked == "logout" ? onClickLink : linkColor}
              >
                <button
                  style={buttonStyle}
                  onClick={logout}
                  id="logout"
                  className="btn btn-outline-dark text-light float-center"
                >
                  Logout
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    size="1x"
                    className="ml-2"
                  />
                </button>
              </Link>
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
}

export default SuiteSidebar;
