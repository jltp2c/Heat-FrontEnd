import axios from "axios";
import React, { useEffect, useState,useContext } from "react";
import ConsumeFoods from "./ConsumeFoods";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Foods() {

  const [foods, setFoods] = useState([])
  const [foodsConsumed, setfoodsConsumed] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const {user : userContext, authenticateUser} = useContext(AuthContext);
  const notify = () => toast("You add one food !");
  

// all storage food
  const getAllFoods= async() => {
    try {
      const response = await axios.get('http://localhost:5005/api/board/foods', {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }})
      // console.log(response.data.food)
      setFoods(response.data.food)
     
    } catch (error) {
      console.log(error)
    }
  }

  //add a consume add in the database adding with the button "+"
  const getOneFood = async (foodId) =>{
    
    try {
    const response= await axios.post(`http://localhost:5005/api/board/foods/${foodId}`,foodId,{
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }})
      getAllFoodsConsumed()
      console.log(response)
       notify()
    } catch (error) {
      console.log(error)
    }
  }

  // all foods consumed
  const getAllFoodsConsumed= async() => {
  
    try {
      const response = await axios.get('http://localhost:5005/api/board/foods/consumed', {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }})
      // console.log(response.data.foodConsumed)
      setfoodsConsumed(response.data.foodConsumed)
    } catch (error) {
      console.log(error)
    }
  }

  const searchBar = (foodToFind) =>{
    const searchedFoods = foods.filter((food) => {
      return food.name.toLowerCase().includes(foodToFind.toLowerCase())
    })
    setSearchValue(foods)
    setFoods(searchedFoods)
    console.log(searchedFoods)
  }


  const handleSearch = (e) =>{
    if(e.target.value !== ""){
      searchBar(e.target.value)
    }else{
      getAllFoods()
    }
  }
  

  useEffect(() => {
    getAllFoods()
    getAllFoodsConsumed()
   
  },[])


  return(
        <div className="Container">
             <ToastContainer/>
          <h2>Add your Meal !</h2>
          <div className="searchBarFood">
            <input type="text" onChange={handleSearch} placeholder=" Example : egg" />
          </div>
          <ConsumeFoods foodsConsumed={foodsConsumed} getAllFoodsConsumed={getAllFoodsConsumed} userContext={userContext} />
          <h3>Food storage ( portion : 100g)</h3>
          <div className="foodStorage">
            { foods.map((eachFood) => {
              
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
