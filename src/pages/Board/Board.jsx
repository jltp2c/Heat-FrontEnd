import React, { useState } from 'react';

const Board = () => {

 const [date,setDate]=useState(() => new Date())

  // const getTodayDate = () =>{
  //     const event = new Date();
  //   const [today] = event.toISOString().split("T")
  //   console.log(today);
  //     return today
  // }

const previousDate = () => {
  const copy = new Date(date.toString())
  copy.setDate(copy.getDate() - 1)
  setDate(copy)
}

const nextDate = () => {
  const copy = new Date(date.toString())
  copy.setDate(copy.getDate() + 1)
  setDate(copy)
}
    
 return (
   <div>
     <div>
       <button onClick={previousDate}>←</button>
       <button onClick={()=>setDate(() => new Date())}>{date.toDateString()}</button> 
       <button onClick={nextDate}>→</button>
     </div>
   </div>
 )

  
};

export default Board

