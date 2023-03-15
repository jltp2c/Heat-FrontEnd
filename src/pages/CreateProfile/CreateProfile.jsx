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
const {user,setUser , authenticateUser, removeToken } = useContext(AuthContext);

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
      console.log(error);
    }
  };
  function handleLogOut() {
    removeToken();
    authenticateUser();
  }
 
  return (
    <>
    <form onSubmit={handleSubmit}>
      <div>
        <option disabled value="-1">
          Select a category
        </option>{" "}
        <select
          value={gender}
          name=""
          id="gender"
          onChange={(event) => setGender(event.target.value)}
        >
          <option disabled value="disabled">
            Gender :
          </option>
          <option value="Man">Man</option>
          <option value="Woman">Woman</option>
        </select>
     
      </div>

      <div>
        <label htmlFor="age">
          Age:&nbsp;
          <input
            type="number"
            id="age"
            min={18}
            value={age}
            onChange={(event) => setAge(event.target.value)}
            placeholder="18"
          />
        </label>
      </div>

      <div>
        <label htmlFor="height">
          Height:&nbsp;
          <input
            type="number"
            id="currentHeight"
            value={currentHeight}
            onChange={(event) => setCurrentHeight(event.target.value)}
            placeholder="180"
          />
          cms
        </label>
      </div>

      <div>
        <label htmlFor="weight">
          Weight:&nbsp;
          <input
            type="number"
            id="currentWeight"
            value={currentWeight}
            onChange={(event) => setCurrentWeight(event.target.value)}
            placeholder="80"
          />
          kgs
        </label>
      </div>

      <div>
        <label htmlFor="weightGoal">
          My weight goal:&nbsp;
          <input
            type="number"
            id="weightGoal"
            value={weightGoal}
            onChange={(event) => setWeightGoal(event.target.value)}
            placeholder="70"
          />
          kgs
        </label>
      </div>

      <button>Create my profile </button>
    </form>
    <button onClick={handleLogOut}>Logout</button>
    </>
  );
}

export default CreateProfile;
