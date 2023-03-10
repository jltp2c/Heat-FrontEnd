import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthWrapper from "../src/context/AuthContext.jsx";
import "./pages/Food/Foods.css"
import "./pages/Layout/Layout.css"
import "./pages/Presentation/Presentation.css"
import "../src/pages/Board/Board.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthWrapper>
        <App />
      </AuthWrapper>
    </BrowserRouter>
  </React.StrictMode>
);
