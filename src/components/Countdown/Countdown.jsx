import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";



function Countdown() {
  const [now] = useState(() => new Date());
  const [remainingTime, setRemainingTime] = useState(60);
  const { user: userContext } = useContext(AuthContext);

  const kgToLoose =
    userContext.profile.currentWeight - userContext.profile.weightGoal;

  let days = kgToLoose * 2 * 7;
  days = days.toFixed();
  //console.log(days);

  function calculateCountdown() {
    const endDate = new Date();
    endDate.setHours(now.getHours());
    endDate.setMinutes(now.getMinutes());
    endDate.setSeconds(now.getSeconds());
    endDate.setDate(endDate.getDate() + Number(days));
    //console.log(now, endDate);

    const startDate = new Date();
    const difference = endDate.getTime() - startDate.getTime();

    if (difference > 0) {
      setRemainingTime({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
      setTimeout(calculateCountdown, 1000);
    }
  }

  useEffect(() => {
    calculateCountdown();
  }, []);

  return (
    <div className="countdownContainer">
      <h3>My Goal</h3>
      <div className="containerTimer">
        <div className="timeGoal">
        <span>{remainingTime.days}</span>
        <span>DAYS</span>
      </div>
      <div className="timeGoal">
        <span>{remainingTime.hours}</span>
      <span>HOURS</span>
      </div>
      <div className="timeGoal">
      <span>{remainingTime.minutes}</span>
      <span>MIN</span>
      </div>
      <div className="timeGoal">
      <span>{remainingTime.seconds}</span>
      <span>SEC</span>
      </div>
      </div>
    </div>
  );
}

export default Countdown;
