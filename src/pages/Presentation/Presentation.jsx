import React from "react";
import { Link } from "react-router-dom";
import icone from "../../assets/img/icone.png";


function Presentation() {
  return (
    <div className="presentationPage">
      <div className="blocImageAndTitle">
        <img className="logoHeat" src={icone} alt="icone" width={170} />
        <h1>HEAT</h1>
      </div>
      <p>
        Welcome to the best app that will allow you to lose weight in a healthy
        way{" "}
      </p>
      <div className="logLink">
        <Link className="btn" to="/auth/signup">
          Start here
        </Link>
        <Link className="btn" to="/auth/login">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Presentation;
