import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import myApi from "../../service/service.js";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [weightGoal, setWeightGoal] = useState(0);
  const [idProfile, setIdProfile] = useState("");
  const navigate = useNavigate();

  const { setUser, getToken } = useContext(AuthContext);
  const { user: userContext } = useContext(AuthContext);

  const getProfileToUpdate = async () => {
    try {
      const response = await myApi.get("/api/board/profile", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });

      console.log(response.data);
      setGender(response.data.gender);
      setAge(response.data.age);
      setCurrentWeight(response.data.currentWeight);
      setWeightGoal(response.data.weightGoal);
      setIdProfile(response.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfileToUpdate();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const profileToUpdate = {
      gender,
      age,
      currentWeight,
      weightGoal,
    };
    try {
      const profilUpdated = await myApi.patch(
        `/api/board/profile/${idProfile}`,
        profileToUpdate,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      if (profilUpdated.status === 202) {
        console.log(profilUpdated);
        setUser((user) => {
          console.log(user);
          return { ...user, profile: profilUpdated.data };
        });
        navigate("/board/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <h1 className="udpateTitle">
          Welcome back
          <span className="titleUsername"> {userContext?.username} !</span>
        </h1>
        <p className="completeProfile">
          Whether you have a new goal in mind or just want to udpate some infos,
          this is the place to do it.
        </p>
      </div>
      <form className="createFormContainer" onSubmit={handleSubmit}>
        <div>
          <option className="optionText" disabled value="-1"></option>
          <select
            value={gender}
            name=""
            id="gender"
            onChange={(event) => setGender(event.target.value)}
          >
            <option className="gender" disabled value="disabled">
              gender
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
            value={age}
            onChange={(event) => setAge(event.target.value)}
            placeholder="Enter your age"
          />
        </div>

        <div className="category">
          <input
            type="number"
            id="currentWeight"
            value={currentWeight}
            onChange={(event) => setCurrentWeight(event.target.value)}
            placeholder="Enter your weight in kg"
          />
        </div>

        <div className="category">
          <input
            type="number"
            id="weightGoal"
            value={weightGoal}
            onChange={(event) => setWeightGoal(event.target.value)}
            placeholder="Enter your weight goal in kg"
          />
        </div>

        <button className="specialBtn">Update my profile </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
