import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { AuthContext } from "../../context/AuthContext";
import {  useContext } from "react";

function ReviewsBar({ foodsConsumed }) {
 
  const { user: userContext } = useContext(AuthContext);

  const userGender = userContext.profile.gender;
  let dailyObj = 0;
  if (userGender === "Woman") {
    dailyObj = 1500;
  }else{
    dailyObj = 1950;
  }

  console.log(userGender);
 
  let EachGlucideHaveFourKcal = 4
  let PourcentOfcarbohydratePerDay = 0.45

  console.log("dailyObj=", dailyObj);

  const ProteinTotal = () => {
    let total = 0;
    for (let i = 0; i < foodsConsumed.length; i++) {
      total += foodsConsumed[i].food.protein;
    }
    return total.toFixed(1);
  };

    const carboTotal = () => {
    let total = 0;
    for (let i = 0; i < foodsConsumed.length; i++) {
      total += foodsConsumed[i].food.carbohydrates;
    }
    return total.toFixed(1);
  };

  const getCalories = () => {
    let totalCal = 0;
    for (let i = 0; i < foodsConsumed.length; i++) {
      totalCal += foodsConsumed[i].food.calories;
    }

    return totalCal;
  };

  let caloriesLeft = dailyObj - getCalories();
  let proteinsTotalDay = userContext.profile.currentWeight*0.8;
  let proteinsLeft = proteinsTotalDay - ProteinTotal();

 
 
  return (
    <div className="allCirclesReview">
      <h2>Calories</h2>
      <div className="containerInfos">
      
        <p>Max {dailyObj} kCal</p>
       <div className="circularProgressBarProteins">
        <CircularProgressbar
          value={getCalories()}
          maxValue={dailyObj}
          text={`${getCalories()} kCal`}
          circleRatio={0.7}
          styles={{
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
              stroke: "#15bc25",
            },
            text: { fill: "black" , fontSize: '13px'},
          }}
          strokeWidth={10}
        />
      </div>
      <p>Left {caloriesLeft} kCal</p>
      </div>
      <h2>Proteins</h2>
      <div className="containerInfos">
      
        <p>Max {`${proteinsTotalDay.toFixed(1)}g`}</p>
       <div className="circularProgressBarProteins">
        <CircularProgressbar
          value={ProteinTotal()}
          maxValue={proteinsTotalDay}
          text={ `${ProteinTotal()}g`}
          circleRatio={0.7}
          styles={{
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
              stroke: "#e74c3c",
            },
            text: { fill: "black" , fontSize: '13px'},
          }}
          strokeWidth={10}
        />
      </div>
      <p>Left {proteinsLeft.toFixed(1)}g</p>
      </div>
      <h2>Carbohydrates</h2>
       <div className="containerInfos">
        <p>Max {`${((dailyObj*PourcentOfcarbohydratePerDay)/EachGlucideHaveFourKcal).toFixed(1)}g`}</p>
       <div className="circularProgressBarCarbohydrates">
        <CircularProgressbar
          value={carboTotal()}
          maxValue={((dailyObj*PourcentOfcarbohydratePerDay)/EachGlucideHaveFourKcal).toFixed(1)}
          text={`${carboTotal()}g`}
          circleRatio={0.7}
          styles={{
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
              stroke: "#2980b9",
            },
            text: { fill: "#535252" , fontSize: '13px'},
          }}
          strokeWidth={10}
        />
      </div>
      <p>Left : {((dailyObj*PourcentOfcarbohydratePerDay)/EachGlucideHaveFourKcal-carboTotal()).toFixed(1)} g</p>
      </div>
      <div>

      </div>
    </div>
  );
}

export default ReviewsBar;
