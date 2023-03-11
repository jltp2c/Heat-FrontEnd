import myApi from "../../service/service.js";
import React, { useState } from "react";

function CreateProfile() {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);
  const [currentHeight, setCurrentHeight] = useState(0);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [weightGoal, setWeightGoal] = useState(0);

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
      const response = await myApi.post("/api/board/profile", profileToCreate);
      console.log(response);

      if (response.status === 201) {
        setGender("");
        setAge(0);
        setCurrentHeight(0);
        setCurrentWeight(0);
        setWeightGoal(0);
      }
      console.log(response);
    } catch (error) {}
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="category">Gender: </label>
        <select
          value={gender}
          name=""
          id=""
          onChange={(event) => setGender(event.target.value)}
        >
          <option value="Pun">Man</option>
          <option value="Programming">Woman</option>
        </select>
      </div>

      <div>
        <label htmlFor="age">
          Age:&nbsp;
          <input
            type="number"
            id="age"
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
          m
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
