import React, { useState, useEffect } from "react";

function Timer({ resumeTimer }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (resumeTimer) {
        setCount(count + 1);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [count, resumeTimer]);

  let minutes = Math.floor(count / 60);
  let seconds = count % 60;

  return (
    <div>
      <p>
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </p>
    </div>
  );
}

export default Timer;
