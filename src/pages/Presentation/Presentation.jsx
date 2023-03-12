import React from "react";
import { Link } from "react-router-dom";

function Presentation() {
  return (
    <div className="presentationPage">
      <p>Presentation page</p>
      <div className="logLink">
        <Link to="/auth/signup">Start here</Link>
        <Link to="/auth/login">Login</Link>
      </div>
    </div>
  );
}

export default Presentation;
