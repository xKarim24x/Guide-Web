import React from "react";
import { FaCog, FaBell, FaEnvelope, FaSearch } from "react-icons/fa";
import "./TopNavBar.css";
import PopupButton from "../Popup/PopupButton";

function TopNavBar({user}) {
  return (
    <nav className="TopNavBar">
      <h4 className="Welcome">Hello, {user.firstName}</h4>
      <ul className="NavList">
        <li>
          <PopupButton className="SettingsButton" icon={<FaCog />} />
        </li>
        <li>
          <PopupButton className="SettingsButton" icon={<FaBell />} />
        </li>
        <li>
          <PopupButton className="SettingsButton" icon={<FaEnvelope />} />
        </li>
        <li>
          <PopupButton className="SettingsButton" icon={<FaSearch />} />
        </li>
      </ul>
    </nav>
  );
}

export default TopNavBar;
