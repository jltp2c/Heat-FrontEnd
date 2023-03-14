import React, { useEffect, useState } from "react";
import ReviewsBar from "../../components/Profile/ReviewsBar";
import myApi from "../../service/service";

const Board = () => {
  const [date, setDate] = useState(() => new Date());
  const [foodsConsumed, setfoodsConsumed] = useState([]);

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

  useEffect(() => {
    getAllFoodsConsumed();
  }, [date]);

  const previousDate = () => {
    const copy = new Date(date.toString());
    copy.setDate(copy.getDate() - 1);
    setDate(copy);
  };

  const nextDate = () => {
    const copy = new Date(date.toString());
    copy.setDate(copy.getDate() + 1);
    setDate(copy);
  };

  return (
    <div>
      <div>
        <button onClick={previousDate}>←</button>
        <button onClick={() => setDate(() => new Date())}>
          {date.toDateString()}
        </button>
        <button onClick={nextDate}>→</button>
      </div>
      <div>
        <ReviewsBar foodsConsumed={foodsConsumed}></ReviewsBar>
      </div>
    </div>
  );
};

export default Board;
