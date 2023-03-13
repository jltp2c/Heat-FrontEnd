import myApi from "../../service/service.js";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateProfile() {
  const [gender, setGender] = useState("disabled");
  const [age, setAge] = useState(0);
  const [currentHeight, setCurrentHeight] = useState(0);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [weightGoal, setWeightGoal] = useState(0);


  function getToken() {
    return localStorage.getItem("token");
  }
  const currentToken = getToken();

  const navigate = useNavigate();

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

      // console.log(response);

      if (response.status === 201) {
        setGender("");
        setAge(0);
        setCurrentHeight(0);
        setCurrentWeight(0);
        setWeightGoal(0);
        navigate("/board");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="category">Gender: </label>
        <option disabled value="-1">
          {" "}
          Select a category{" "}
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
        {/* // <legend>Gender:</legend>
        // <input type="checkbox" id="man" name="man" value={gender} />
        // <label htmlFor="man">Man</label>
        // <input type="checkbox" id="woman" name="woman" value={gender} />
        // <label htmlFor="woman">Woman</label> */}
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
          />{" "}
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
          />
          kgs
        </label>
      </div>

      <button>Create my profile </button>
    </form>
  );
}

export default CreateProfile;
