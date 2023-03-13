import React, { useContext, useEffect, useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import myApi from "../../service/service.js";

function Profile() {
  const [user, setUser] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);
  const [currentHeight, setCurrentHeight] = useState(0);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [weightGoal, setWeightGoal] = useState(0);
  const { user: userContext, getToken } = useContext(AuthContext);

  const navigate = useNavigate()

  const getProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5005/api/board/profile",
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      setGender(response.data.gender);
      setAge(response.data.age);
      setCurrentHeight(response.data.currentHeight);
      setCurrentWeight(response.data.currentWeight);
      setWeightGoal(response.data.weightGoal);
      setUser(response.data.user.username);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleDelete = async () => {
    try {
      await myApi.delete("/api/board/profile", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      navigate("/createprofile")
    } catch (error) {
      console.error(error);
    }
  };

  const calculateImc = (weight, height) => {
    const newHeight = height / 100;
    const imc = weight / (newHeight * newHeight);
    return imc.toFixed(1);
  };

  return (
    <div>
      <h1>Welcome {userContext?.username}</h1>
      <p>Gender : {gender}</p>
      <p>Age : {age}</p>
      <p>Height : {currentHeight}</p>
      <p>Current Weight : {currentWeight}</p>
      <p>Weight Goal : {weightGoal}</p>
      <p>Current IMC : {calculateImc(currentWeight, currentHeight)}</p>
      <p>Calories Goal : {weightGoal / 3}</p>

      <button>update profile</button>
      <button onClick={handleDelete}>delete profile</button>
    </div>
  );
}

export default Profile;
