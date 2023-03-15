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
  const navigate = useNavigate()

  const { setUser, getToken } = useContext(AuthContext);

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
        console.log(profilUpdated)
        setUser(user=>{
          console.log(user)
         return {...user, profile: profilUpdated.data}
        })
        navigate("/board/profile")
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>UpdateProfile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="category">Gender: </label>
          <option disabled value="-1">
            Select a category
          </option>
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
              placeholder="18"
            />
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

        <button>Update my profile </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
