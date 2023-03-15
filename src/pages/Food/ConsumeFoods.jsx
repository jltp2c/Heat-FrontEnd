import React, {useContext } from "react";
import myApi from "../../service/service";
import { AuthContext } from "../../context/AuthContext";

export default function ConsumeFoods({
  foodsConsumed,
  getAllFoodsConsumed,
  userContext,
}) {
 
  const { user } = useContext(AuthContext);

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
      total += foodsConsumed[i].food.calories;
    }
    return total;
  };

  const ProteinTotal = () => {
    let total = 0;
    for (let i = 0; i < foodsConsumed.length; i++) {
      total += foodsConsumed[i].food.protein;
    }
    return total.toFixed(2);
  };

  const carboTotal = () => {
    let total = 0;
    for (let i = 0; i < foodsConsumed.length; i++) {
      total += foodsConsumed[i].food.carbohydrates;
    }
    return total.toFixed(2);
  };


  return (
    <div className="containerFoodConsumed">
      <h3>My daily meal</h3>
      <div className="titles">
        <h4> Profile : {userContext?.username}</h4>
        <h4>Daily Calorie : {caloriesTotal()} kCal</h4>
        <h4>
          Protein(s) : {ProteinTotal()} g / {user.profile.currentWeight} g
        </h4>
        <h4>Carbohydrate(s) : {carboTotal()} g </h4>
      </div>

      {foodsConsumed.map(({food : foodConsumed , _id}) => {
        return (
            <div key={foodConsumed._id} className="OneFoodConsumed">
              <p>{foodConsumed.name} (100g)</p>
              <p>Calories : {foodConsumed.calories} kCal</p>
              <p>Protein(s): {foodConsumed.protein}g </p>
              <p> Carbohydrate(s) : {foodConsumed.carbohydrates} g</p>
              <button
                className="deleteBtn"
                onClick={() => handleDelete(_id)}
              >
                {" "}
                ❌{" "}
              </button>
            </div>
        );
      })}
    </div>
  );
}
