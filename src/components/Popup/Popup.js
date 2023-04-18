import React from "react";
import "./Popup.css";

function Popup({ onClose }) {
  return (
    <div className="popup-container">
      <div className="popup">
        <h2>Work in Progress</h2>
        <p>This feature is still being developed and is not yet available.</p>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Popup;
