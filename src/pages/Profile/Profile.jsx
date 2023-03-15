import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import myApi from "../../service/service.js";

function Profile() {
  const { user, setUser, getToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await myApi.delete("/api/board/profile", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setUser({ ...user, profile: null });
      return navigate("/createprofile");
    } catch (error) {
      console.error(error);
    }
  };

  const calculateImc = (weight, height) => {
    const newHeight = height / 100;
    const imc = weight / (newHeight * newHeight);
    return imc.toFixed(1);
  };

  const handleUpdate = async () => {
    navigate(`/board/profile/update/${user.profile._id}`);
  };

  const { gender, age, currentHeight, currentWeight, weightGoal } =
    user.profile;
  return (
    <div>
      <h1>Welcome {user?.username}</h1>
      <p>Gender : {gender}</p>
      <p>Age : {age}</p>
      <p>Height : {currentHeight}</p>
      <p>Current Weight : {currentWeight}</p>
      <p>Weight Goal : {weightGoal}</p>
      <p>Current IMC : {calculateImc(currentWeight, currentHeight)}</p>
      <p>Calories Goal : {weightGoal}</p>

      <button onClick={handleUpdate}>update profile</button>
      <button onClick={handleDelete}>delete profile</button>
    </div>
  );
}

export default Profile;
