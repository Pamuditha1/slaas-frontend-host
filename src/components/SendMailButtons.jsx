import React, { useState } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

function SendMailButtons({ array, title, setselected }) {
  const [dropdownOpen, setOpen] = useState(false);
  // const [disabled, setdisabled] = useState(false)
  const toggle = () => setOpen(!dropdownOpen);

  const clickHandle = (s) => {
    setselected(s);
    // setdisabled(true)
  };

  const buttonStyle = {
    boxShadow: "0px 5px 10px grey",
    fontWeight: "bold",
    borderRadius: "40px",
    //backgroundColor: "#002263",
    backgroundColor: "#580b0d",
  };

  return (
    <div>
      <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle
          caret
          color="danger"
          style={buttonStyle}
          className="pl-3 pr-3"
        >
          {title}
        </DropdownToggle>
        <DropdownMenu>
          {array.map((s) => (
            <DropdownItem key={s} onClick={() => clickHandle(s)}>
              {s}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </ButtonDropdown>
    </div>
  );
}

export default SendMailButtons;
