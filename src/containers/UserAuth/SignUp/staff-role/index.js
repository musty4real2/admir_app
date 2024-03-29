import React from "react";
import { InputGroup } from "../../style/user-auth.styled";
import { Fade } from "react-awesome-reveal";
import Select from "react-dropdown-select";

const Role = ({ staffRole, roleChange }) => {
  const options = [
    { label: "Worker", value: "Worker" },
    { label: "Manager", value: "Manager" },
  ];

  return (
    <React.Fragment>
      <Fade cascade triggerOnce>
        <h1>Complete Your profile!</h1>
        <p className="auth-instruction">
          For the purpose of industry regulation, your details are required.
        </p>
        <InputGroup>
          <label htmlFor="fullname">Role</label>
          <Select
            value={staffRole}
            options={options}
            placeholder="Please select your role"
            required={true}
            dropdownPosition="top"
            className="staff-country"
            color="var(--primary)"
            onChange={roleChange}
          />
        </InputGroup>
      </Fade>
    </React.Fragment>
  );
};

export default Role;
