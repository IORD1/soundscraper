import React from "react";
import "./spinner.css";

export default function Spinner() {
  return (
    <div className="spinner-container">
      <div className="loading-spinner">
      </div>
      <p id="spinnertext">Fetching token and playlist</p>
    </div>
  );
}