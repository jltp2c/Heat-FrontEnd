import myApi from "../../service/service.js";
import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";

function CreateProfile() {
  const [gender, setGender] = useState("disabled");
  const [age, setAge] = useState("");
  const [currentHeight, setCurrentHeight] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [weightGoal, setWeightGoal] = useState("");
  const navigate = useNavigate();
  const { user, setUser, authenticateUser, removeToken } =
    useContext(AuthContext);
  const [error, setError] = useState("");

  function getToken() {
    return localStorage.getItem("token");
  }
  const currentToken = getToken();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const profileToCreate = {
      gender,
      age,
      currentHeight,
      currentWeight,
      weightGoal,
    };

    try {
      const response = await myApi.post("/api/board/profile", profileToCreate, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      const { data: profile } = response;

      if (response.status === 201) {
        setUser((user) => ({ ...user, profile }));

        navigate("/board");
      }
      console.log(response);
    } catch (error) {
      // console.error(error.response.data);
      setError(error?.response?.data?.message ?? "something went wrong");
    }
  };
  function handleLogOut() {
    removeToken();
    authenticateUser();
  }

  return (
    <>
      <div>
        <h1>New here?</h1>
        <p className="completeProfile">
          Complete your profile and start your journey right now!
        </p>
      </div>
      <form className="createFormContainer" onSubmit={handleSubmit}>
        <div className="category">
          <option className="optionText" disabled value="-1"></option>
          <select
            value={gender}
            name=""
            id="gender"
            onChange={(event) => setGender(event.target.value)}
          >
            <option className="gender" disabled value="disabled">
              Gender
            </option>
            <option value="Man">Man</option>
            <option value="Woman">Woman</option>
          </select>
        </div>

        <div className="category">
          <input
            type="number"
            id="age"
            min={18}
            max={120}
            value={age}
            onChange={(event) => setAge(event.target.value)}
            placeholder="Enter your age"
          />
        </div>

        <div className="category">
          <input
            type="number"
            id="currentHeight"
            value={currentHeight}
            min={100}
            max={300}
            onChange={(event) => setCurrentHeight(event.target.value)}
            placeholder="Enter your height (cm)"
          />
        </div>

        <div className="category">
          <input
            type="number"
            id="currentWeight"
            value={currentWeight}
            min= {20}
            max={300}
            onChange={(event) => setCurrentWeight(event.target.value)}
            placeholder="Enter your weight (kg)"
          />
        </div>

        <div className="category">
          <input
            type="number"
            id="weightGoal"
            value={weightGoal}
            min= {20}
            max={300}
            onChange={(event) => setWeightGoal(event.target.value)}
            placeholder="Enter your weight goal (kg)"
          />
        </div>
        {error.length > 0 && <p className="error">{error}</p>}
        <button className="specialBtn">Create my profile </button>
      </form>
      <div className="btnLogoutContainer">
        <button className="btnLogout" onClick={handleLogOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeinejoin="round"
          >
            <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
            <line x1="12" y1="2" x2="12" y2="12"></line>
          </svg>
        </button>
      </div>
    </>
  );
}

export default CreateProfile;
