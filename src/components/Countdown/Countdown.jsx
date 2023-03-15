import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

import "./Countdown.css";

const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};

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

  //Ines
  //   useEffect(() => {
  //     remainingTime > 0 &&
  //       setTimeout(() => setRemainingTime(remainingTime - 1), 1000);
  //   }, [remainingTime]);
  //   console.log("rem", remainingTime);

  return (
    <div className="countdownContainer">
      <span>{remainingTime.days}</span>
      <span>days</span>
      <span>{remainingTime.hours}</span>
      <span>hours</span>
      <span>{remainingTime.minutes}</span>
      <span>minutes</span>
      <span>{remainingTime.seconds}</span>
      <span>seconds</span>
    </div>
  );
}

export default Countdown;
