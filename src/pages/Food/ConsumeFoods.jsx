import React, {useContext } from "react";
import myApi from "../../service/service";
import trash from "../../assets/img/icons/trash.svg"

export default function ConsumeFoods({
  foodsConsumed,
  getAllFoodsConsumed,
  setfoodsConsumed
}) {
 

  const handleDelete = async (foodId) => {
    try {
      await myApi.delete(`/api/board/foods/${foodId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      // console.log(deleteFood);
      const deletedElement = foodsConsumed.filter(foodToDelete => foodToDelete.food._id !== foodId)
      setfoodsConsumed(deletedElement)
      getAllFoodsConsumed()
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
      <div className="titles">
        <h4>Calories : {caloriesTotal()} kCal</h4>
        <h4>
          Protein(s) : {ProteinTotal()} g 
        </h4>
        <h4>Carbohydrate(s) : {carboTotal()} g </h4>
      </div>

      {foodsConsumed.map(({food : foodConsumed , _id}) => {
        return (
            <div key={_id} className="OneFoodConsumed">
              <p>{foodConsumed.name} (100g)</p>
              <p>{foodConsumed.calories} kCal</p>
              <p>Pro: {foodConsumed.protein}g </p>
              <p> Carb: {foodConsumed.carbohydrates}g</p>
              <button
                className="deleteBtn"
                onClick={() => handleDelete(_id)}
              >
                <img src={trash} alt="trash" />
                
              </button>
            </div>
        );
      })}
    </div>
  );
}
