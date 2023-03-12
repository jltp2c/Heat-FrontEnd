import axios from "axios";
import React, { useEffect, useState } from "react";
import ConsumeFoods from "./ConsumeFoods";

function Foods() {

  const [foods, setFoods] = useState([])
  const [oneFood, setOneFoods] = useState([])

  function getToken() {
    return localStorage.getItem("token");
  }
// all storage food
  const getAllFoods= async() => {
    const currentToken = getToken();
    try {
      const response = await axios.get('http://localhost:5005/api/board/foods', {
      headers: { Authorization: `Bearer ${currentToken}` }})
      // console.log(response.data.food)
      setFoods(response.data.food)
    } catch (error) {
      console.log(error)
    }
  }


  //Consume foods added by user PROBLEME A REGLER
  const getOneFood = async (foodId) =>{
    const currentToken = getToken();
    try {
    const response= await axios.get(`http://localhost:5005/api/board/foods/${foodId}`,{
    headers: { Authorization: `Bearer ${currentToken}` }})
    console.log(response.data)
    setOneFoods(response.data.food)
    } catch (error) {
      console.log(error)
    }
  }

 

  useEffect(() => {
    getAllFoods()
  },[])


  return(
        <div className="Container">
          <h2>Add your Meal !</h2>
          <div className="searchBarFood">
            <input type="text"  placeholder=" Example : egg" />
          </div>
          <ConsumeFoods oneFood={oneFood} />
          <h3>Food storage ( portion : 100g)</h3>
          <div className="foodStorage">
            {foods.map((eachFood) => {
              return (
                <div key={eachFood._id} className="cardContainerFood">
                  <p>{eachFood.name}</p>
                  <p>Calories : {eachFood.calories} kCal</p>
                  <p>carbohydrates : {eachFood.carbohydrates} g</p>
                  <p> proteins : {eachFood.protein} g</p>
                  <button onClick={() => getOneFood(eachFood._id)}>+</button>
                </div>
              )
            })}
          </div>
        </div>
  )
}

export default Foods;
