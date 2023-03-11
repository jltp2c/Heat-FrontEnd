import React from "react";
import { useState, useContext } from "react";
import myApi from "./../../service/service";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  //initialization of states for inputs and error
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //Extracts and retrieves the storeToken and authenticateUser functions from the AuthContext file
  const { storeToken, authenticateUser } = useContext(AuthContext);

  //Initialization of redirection after a successful login
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    //Initialization of userToLogin and its username and password
    const userToLogin = { username, password };

    try {
      const response = await myApi.post("/api/auth/login", userToLogin);
      console.log("response:", response);
      //the storeToken a authenticateUser functions from the AuthContext file are used here and performed on the responde.data.token
      storeToken(response.data.token);
      await authenticateUser();

      if (response.status === 200) {
        console.log("user logged");
        navigate("/createprofile");
      }
    } catch (error) {
      console.error("error:", error.response.data.message);
      setError(error.response.data.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">
          Username:&nbsp;
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:&nbsp;
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>

      {error.length > 0 && <p className="error">{error}</p>}
      <button>Login</button>
    </form>
  );
}
