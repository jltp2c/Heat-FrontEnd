
import React, { useState, useEffect } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import myApi from "../../service/service.js"
import ReviewsBar from "../../components/Profile/ReviewsBar";



const Board = () => {

const [date,setDate]=useState(() => new Date())
const [open, setOpen] = useState(false);
const [foodsConsumed, setfoodsConsumed] = useState([]);
const onOpenModal = () => setOpen(true);
const onCloseModal = () => setOpen(false);

 // all foods consumed
  const getAllFoodsConsumed = async () => {
    try {
      const response = await myApi.get(`/api/board/foods/consumed?date=${date}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });


      setfoodsConsumed(response.data.foodConsumed);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllFoodsConsumed();    
  }, [date]);

 

const previousDate = () => {
  const copy = new Date(date.toString())
  copy.setDate(copy.getDate() - 1)
  setDate(copy)
  console.log(date)
}

const nextDate = () => {
  const copy = new Date(date.toString())
  copy.setDate(copy.getDate() + 1)
  console.log(date)
  setDate(copy)
  console.log(copy.toString())
}
    
 return (
   <div>
     <div className='containerResultsDate'>
       <button onClick={previousDate}>←</button>
       <button onClick={()=>setDate(() => new Date())}>{date.toDateString()}</button> 
       <button onClick={nextDate}>→</button>
     </div>
         <div className='modal'>
      <button onClick={onOpenModal}>My daily foods</button>
      <Modal open={open} onClose={onCloseModal} center>
        <p>List foods</p>
         {foodsConsumed.map((foodConsumed) => {
        return (
            <div key={foodConsumed._id} className="OneFoodConsumed">
              <p>{foodConsumed.name} (100g)</p>
              <p>Calories : {foodConsumed.calories} kCal</p>
              <p>Protein(s): {foodConsumed.protein}g </p>
              <p> Carbohydrate(s) : {foodConsumed.carbohydrates} g</p>
            </div>
            );
          })}
      </Modal>
    </div>
      <div className='reviewsBar Container'>
        <ReviewsBar foodsConsumed={foodsConsumed}></ReviewsBar>
      </div>
  
   </div>
 )

  
};

export default Board;
