import React, { useEffect, useState, useContext } from "react";
import ConsumeFoods from "./ConsumeFoods";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import myApi from "../../service/service";
import addPic from "../../assets/img/icons/plus-circle.svg"

function Foods() {
  // const [date, setDate] = useState(new Date())
  const [foods, setFoods] = useState([]);
  const [foodsConsumed, setfoodsConsumed] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const { user: userContext } = useContext(AuthContext);
  const notify = () => toast("You add one food !");

  // all storage food
  const getAllFoods = async () => {
    try {
      const response = await myApi.get("/api/board/foods", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      // console.log(response.data.food)
      setFoods(response.data.food);
    } catch (error) {
      console.log(error);
    }
  };

  //add a consume add in the database adding with the button "+"
  const getOneFood = async (foodId) => {
    try {
      const response = await myApi.post(
        `/api/board/foods/${foodId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
    
      getAllFoodsConsumed();
      console.log(response);
      notify();
    } catch (error) {
      console.log(error);
    }
  };

  // all foods consumed
  const getAllFoodsConsumed = async () => {
    try {
      const response = await myApi.get("/api/board/foods/consumed", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      // console.log(response.data.foodConsumed)
      setfoodsConsumed(response.data.foodConsumed);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    let value = e.target.value;
    setSearchValue(value)
  };

  useEffect((e) => {
    getAllFoods();
    getAllFoodsConsumed();
  }, []);

  return (
    <div className="Container">
      <ToastContainer 
      />
      <h2>Add your Meal {userContext?.username} !</h2>
      
      <ConsumeFoods
        foodsConsumed={foodsConsumed}
        getAllFoodsConsumed={getAllFoodsConsumed}
        setfoodsConsumed={setfoodsConsumed}
      />
     
      <h3>Pick your food (per 100g)</h3>
       <div className="searchBarFood">
        <input
          type="text"
          onChange={(handleSearch)}
          placeholder=" Example : egg"
        />
      </div>
      <div className="foodStorage">
      
          {foods
        .filter((food) => {
          return food.name.toLowerCase().includes(searchValue.toLowerCase());
         })
        .map((eachFood) => {
          return (
            <div key={eachFood._id} className="cardContainerFood">
              <p className="alignLeft">{eachFood.name} (100g)</p>
              <p>{eachFood.calories} kCal</p>
              <p>Pro: {eachFood.protein}g</p>
              <p>Carb: {eachFood.carbohydrates}g</p>
              <button
                className="addBtn"
                onClick={() => getOneFood(eachFood._id)}
              >
                <img src={addPic} alt="addingBtn"></img>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Foods;
