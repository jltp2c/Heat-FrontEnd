import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

function Countdown() {
  // const [now] = useState(() => new Date());
  const [remainingTime, setRemainingTime] = useState(0);
  const { user: userContext } = useContext(AuthContext);

  const kgToLoose =
    userContext.profile.currentWeight - userContext.profile.weightGoal;

  let days = kgToLoose * 2 * 7;
  days = days.toFixed();

  function calculateCountdown() {
    const now = new Date();
    const storedStartDate = new Date(userContext.profile.createdAt);
    const endDate = new Date(storedStartDate.getTime() + days * 86400000);

    const difference = endDate.getTime() - now.getTime();

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
    console.log("rem", remainingTime);
  }, []);

  return (
    <div className="countdownContainer">
      <h1>My Goal</h1>
      <div className="containerTimer">
        <div className="timeGoal">


        <span>{remainingTime.days}</span>
        <span>DAYS</span>
      </div>
      <span>:</span>
      <div className="timeGoal">
        <span>{remainingTime.hours}</span>
      <span>H</span>
      </div>
      <span>:</span>
      <div className="timeGoal">
      <span>{remainingTime.minutes}</span>
      <span>MIN</span>
      </div>
      <span>:</span>
      <div className="timeGoal">
      <span>{remainingTime.seconds}</span>
      <span>SEC</span>
      </div>

      </div>
    </div>
  );
}

export default Countdown;
