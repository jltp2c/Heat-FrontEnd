import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { AuthContext } from "../../context/AuthContext";
import { useEffect, useState, useContext } from "react";

function ReviewsBar({ foodsConsumed }) {
  //   const [calories, setCalories] = useState(0);
  const { user: userContext, authenticateUser } = useContext(AuthContext);

  const userGender = userContext.profile.gender;
  let dailyObj = 0;
  if (userGender === "Woman") {
    dailyObj = 1500;
  }
  if (userGender === "Man") {
    dailyObj = 1950;
  }

  console.log("dailyObj=", dailyObj);

  const getCalories = () => {
    let totalCal = 0;
    for (let i = 0; i < foodsConsumed.length; i++) {
      totalCal += foodsConsumed[i].calories;
    }

    return totalCal;
  };

  let caloriesLeft = dailyObj - getCalories();

  return (
    <>
      <div>
        <p>{getCalories()}</p>
        <p>{caloriesLeft}</p>
      </div>
      <div>
        <CircularProgressbar
          value={getCalories()}
          maxValue={dailyObj}
          text={dailyObj}
          circleRatio={0.7}
          styles={{
            text: { fill: "#000000" },
            trail: {
              strokeLinecap: "butt",
              transform: "rotate(-126deg)",
              transformOrigin: "center center",
              stroke: "#FEFFC1",
            },
            path: {
              strokeLinecap: "butt",
              transform: "rotate(-126deg)",
              transformOrigin: "center center",
              stroke: "#7FCD95",
            },
            text: { fill: "#ddd" },
          }}
          strokeWidth={10}
        />
      </div>
      <div>
        <p></p>
        <p></p>
      </div>
    </>
  );
}

export default ReviewsBar;
