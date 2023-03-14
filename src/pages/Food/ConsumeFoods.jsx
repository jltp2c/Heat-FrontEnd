import React, { useState } from "react";
import myApi from "../../service/service";

export default function ConsumeFoods({
  foodsConsumed,
  getAllFoodsConsumed,
  userContext,
}) {
  const [currentWeight, setCurrentWeight] = useState(0);
  const [currentUserProfile, setCurrentUserProfile] = useState("");

  // const getUserInfo = async () => {
  //   try {
  //     const res = await axios.get('http://localhost:5005/api/board/profile')
  //     console.log(res)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const handleDelete = async (foodId) => {
    try {
      const deleteFood = await myApi.delete(`/api/board/foods/${foodId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      // console.log(deleteFood);
      getAllFoodsConsumed();
    } catch (error) {
      console.log(error);
    }
  };

  const caloriesTotal = () => {
    let total = 0;
    for (let i = 0; i < foodsConsumed.length; i++) {
      //we compare the id of the food and the current user if not return 0 for the total of calories
      total += foodsConsumed[i].calories;
    }
    return total;
  };

  const ProteinTotal = () => {
    let total = 0;
    for (let i = 0; i < foodsConsumed.length; i++) {
      total += foodsConsumed[i].protein;
    }
    return total.toFixed(2);
  };

  const carboTotal = () => {
    let total = 0;
    for (let i = 0; i < foodsConsumed.length; i++) {
      total += foodsConsumed[i].carbohydrates;
    }
    return total.toFixed(2);
  };

  const currentWeightProtein = () => {
    return currentWeight * 0.8;
  };

  const getProfile = async () => {
    const response = await myApi.get("/api/board/profile", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    // console.log("RESPONSE :",response.data.currentWeight)
    setCurrentWeight(response.data.currentWeight);
    setCurrentUserProfile(response.data.user._id);
  };

  getProfile();
  return (
    <div className="containerFoodConsumed">
      <h3>My Meal</h3>
      <div className="titles">
        <h4> Profile : {userContext?.username}</h4>
        <h4>Daily Calorie : {caloriesTotal()} kCal</h4>
        <h4>
          Protein(s) : {ProteinTotal()} g / {currentWeightProtein()} g
        </h4>
        <h4>Carbohydrate(s) : {carboTotal()} g </h4>
      </div>

      {foodsConsumed.map((foodConsumed) => {
        return (
          //ternaire pour ne pas afficher les foods consumes quand un utilisateur se connecte sur un autre compte
          userContext._id === foodConsumed.user ? (
            <div key={foodConsumed._id} className="OneFoodConsumed">
              <p>{foodConsumed.name} (100g)</p>
              <p>Calories : {foodConsumed.calories} kCal</p>
              <p>Protein(s): {foodConsumed.protein}g </p>
              <p> Carbohydrate(s) : {foodConsumed.carbohydrates} g</p>
              <button
                className="deleteBtn"
                onClick={() => handleDelete(foodConsumed._id)}
              >
                {" "}
                ❌{" "}
              </button>
              <h4>Daily Calorie : {caloriesTotal()} kCal</h4>
            </div>
          ) : null
        );
      })}
    </div>
  );
}
