import React, { useState, useEffect } from 'react';

function DateTime() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // Update the date and time every second
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <h5 className="date-time mt-2">
        {currentDateTime.toLocaleString('en-US', {
          hour12: false
        })}
      </h5>
    </>
  );
}

export default DateTime;
