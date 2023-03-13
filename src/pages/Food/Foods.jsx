import axios from "axios";
import React, { useEffect, useState } from "react";
import ConsumeFoods from "./ConsumeFoods";

function Foods() {

  const [foods, setFoods] = useState([])
  const [foodsConsumed, setfoodsConsumed] = useState([])

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

  //add a consume add in the database adding with the button "+"
  const getOneFood = async (foodId) =>{
    const currentToken = getToken();
    try {
    // par pur hasard j'ai essayé de mettre foodId en deuxieme argument comme le montre dans les tuto axios pour le post mais faut demander au TI pourquoi car je comprends pas trop, quand on appuie ca ajoute bien
    const response= await axios.post(`http://localhost:5005/api/board/foods/${foodId}`,foodId,{
    headers: { Authorization: `Bearer ${currentToken}` }})
      getAllFoodsConsumed()
    } catch (error) {
      console.log(error)
    }
  }

  // all foods consumed
  const getAllFoodsConsumed= async() => {
    const currentToken = getToken();
    try {
      const response = await axios.get('http://localhost:5005/api/board/foods/consumed', {
      headers: { Authorization: `Bearer ${currentToken}` }})
      // console.log(response.data.foodConsumed)
      setfoodsConsumed(response.data.foodConsumed)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getAllFoods()
    getAllFoodsConsumed()
  },[])


  return(
        <div className="Container">
          <h2>Add your Meal !</h2>
          <div className="searchBarFood">
            <input type="text"  placeholder=" Example : egg" />
          </div>
          <ConsumeFoods foodsConsumed={foodsConsumed} getAllFoodsConsumed={getAllFoodsConsumed} />
          <h3>Food storage ( portion : 100g)</h3>
          <div className="foodStorage">
            {foods.map((eachFood) => {
              return (
                <div key={eachFood._id} className="cardContainerFood">
                  <p>{eachFood.name}</p>
                  <p>Calories : {eachFood.calories} kCal</p>
                  <p>carbohydrates : {eachFood.carbohydrates} g</p>
                  <p> proteins : {eachFood.protein} g</p>
                  <button className="addBtn" onClick={() => getOneFood(eachFood._id)}>+</button>
                </div>
              )
            })}
          </div>
        </div>
  )
}

export default Foods;
