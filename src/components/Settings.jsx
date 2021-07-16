import React from "react";
import SettingItem from "./SettingItem";

function Settings() {
  return (
    <div>
      <div className="row mr-3 mt-5">
        <SettingItem name="Membership Grades" link="/user/settings/grades" />
        <SettingItem
          name="Membership Sections"
          link="/user/settings/sections"
        />
        <SettingItem
          name="Termination Periods"
          link="/user/settings/terminations"
        />
        <SettingItem name="Add New Committe" link="/user/settings/committees" />
        <SettingItem name="Email Settings" link="/user/email-settings" />
        <SettingItem name="Register User" link="/user/register-user" />
      </div>
    </div>
  );
}

export default Settings;
