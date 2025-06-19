import React from "react";
import "../App.css";

// PUBLIC_INTERFACE
export default function NavigationHeader() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <span className="logo-symbol" role="img" aria-label="Logo">★</span> KaviaLearn Explorer
        </div>
        <button className="btn">Menu</button>
      </div>
    </nav>
  );
}
