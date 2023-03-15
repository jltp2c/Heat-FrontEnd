import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthWrapper from "../src/context/AuthContext.jsx";
import "./pages/Food/Foods.css";
import "./pages/Layout/Layout.css";
import "./pages/Presentation/Presentation.css";
import "../src/pages/Board/Board.css";
import "../src/components/Countdown/Countdown.css";
import "../src/components/Profile/ReviewsBar.css";
import "../src/pages/Signup/Signup.css";
import "../src/assets/styles/template.css";
import "../src/pages/Profile/Profile.css";
import "../src/pages/CreateProfile/CreateProfile.css";
import "../src/pages/Login/Login.css";
import "animate.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthWrapper>
        <App />
      </AuthWrapper>
    </BrowserRouter>
  </React.StrictMode>
);
