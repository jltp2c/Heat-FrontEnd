import React from "react";
import { useState } from "react";
import myApi from "./../../service/service";
import { Navigate, useNavigate } from "react-router-dom";
import TitleApp from "../../components/Profile/TitleApp";

export default function Signup() {
  const [{ username, email, password }, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    const updatedState = {
      username,
      email,
      password,
      [event.target.id]: event.target.value,
    };
    setFormData(updatedState);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const userToCreate = { username, email, password };

    try {
      const response = await myApi.post("/api/auth/signup", userToCreate);
      if (response.status === 201) {
        navigate("/auth/login");
      }
    } catch (error) {
      console.error(error.response.data);
      setError(error.response.data.message);
    }
  }

  return (
  <>
      <TitleApp />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">
            Username:&nbsp;
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="email">
            Email:&nbsp;
            <input
              type="text"
              id="email"
              value={email}
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </label>
        </div>

        {error.length > 0 && <p className="error">{error}</p>}
        <button className="btn">Signup</button>
      </form>
    </>

  );
}
