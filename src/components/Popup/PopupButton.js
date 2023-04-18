import React, { useState } from "react";
import Popup from "./Popup";
import "../TopNavBar/TopNavBar";

const PopupButton = ({ icon, className }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup((prev) => !prev);
  };

  return (
    <>
      <button className={className} onClick={togglePopup}>{icon}</button>
      {showPopup && (
        <Popup onClose={togglePopup}>This feature is a work in progress.</Popup>
      )}
    </>
  );
};

export default PopupButton;
