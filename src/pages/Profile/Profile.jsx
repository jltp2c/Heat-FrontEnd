import React, { useContext} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import myApi from "../../service/service.js";

function Profile() {
  const { user, setUser, getToken, authenticateUser, removeToken } =
    useContext(AuthContext);

  function handleLogOut() {
    removeToken();
    authenticateUser();
  }
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

  const calculateObjCalories = () => {
    let dailyObj = 0;
    if (gender === "Woman") {
      dailyObj = 1500;
    } else {
      dailyObj = 1950;
    }

    return dailyObj;
  };

  const handleUpdate = async () => {
    navigate(`/board/profile/update/${user.profile._id}`);
  };

  const { gender, age, currentHeight, currentWeight, weightGoal } =
    user.profile;
  return (
    <div className="allProfileContainer">
      <header>
        <h1 className="profileHeader">
          Welcome <p className="colorUsername">{user?.username} !</p>{" "}
        </h1>
      </header>

      <div className="profilContainer">
        <div className="profilTopSection">
          <div className="profilInfo">
            <p className="profilInfoList">
              <b>Gender : </b>
              {gender}
            </p>
            <p className="profilInfoList">
              <b>Age : </b>
              {age}
            </p>
            <p className="profilInfoList">
              <b>Height : </b>
              {currentHeight} cm
            </p>
            <p className="profilInfoList">
              <b>Current Weight : </b>
              {currentWeight} kg
            </p>
            <p className="profilInfoList">
              <b>Weight Goal : </b>
              {weightGoal} kg
            </p>
            <p className="profilInfoList">
              <b>Current IMC : </b>
              {calculateImc(currentWeight, currentHeight)}
            </p>
            <p className="profilInfoList">
              <b>Daily Calories Goal : </b>
              {calculateObjCalories()} kCal
            </p>
          </div>
          <div className="profilLogOutBtnContainer">
            <NavLink to="/">
              <button onClick={handleLogOut}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                  <line x1="12" y1="2" x2="12" y2="12"></line>
                </svg>
              </button>
            </NavLink>
          </div>
        </div>
        <div className="profilBottomSection">
          <h2 className="manageProfilTitle">Manage my profile</h2>
          <p>
            Missed something ? Update your profile's infos or delete it here !
          </p>
          <div className="profilBtns">
            <button className="btn" onClick={handleUpdate}>
              Update
            </button>
            <button className="profilDeleteBtn" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
