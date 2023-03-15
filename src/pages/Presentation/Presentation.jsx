import React from "react";
import { Link } from "react-router-dom";
import icone from "../../assets/img/icone.png"
import TitleApp from "../../components/Profile/TitleApp";


function Presentation() {
  return (
    <div className="presentationPage">
      <div className="blocImageAndTitle">
        <img src={icone} alt="icone" width={170}/>
        <TitleApp />
      </div>

      <div className="logLink">
        <Link className="btn" to="/auth/signup">Start here</Link>
        <Link className="btn" to="/auth/login">Login</Link>
      </div>
    </div>
  );
}

export default Presentation;
