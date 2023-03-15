import React from "react";
import { Link } from "react-router-dom";
import TitleApp from "../../components/Profile/TitleApp";

function Presentation() {
  return (
    <div className="presentationPage">
      <TitleApp />
      <div className="logLink">
        <Link to="/auth/signup">Start here</Link>
        <Link to="/auth/login">Login</Link>
      </div>
    </div>
  );
}

export default Presentation;
