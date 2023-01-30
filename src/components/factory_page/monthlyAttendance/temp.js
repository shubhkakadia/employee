import React, { useState } from "react";
import moment from "moment";
import "./temp.css";

function Calendar() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);

  const handlePrevious = () => {
    setMonth(month - 1);
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    }
  };

  const handleNext = () => {
    setMonth(month + 1);
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    }
  };

  const handleClick = (day) => {
    setSelectedDay(day);
  };

  const daysInMonth = moment(`${year}-${month+1}`, "YYYY-MM").daysInMonth();
  const days =[];
  for(let i=1;i<=daysInMonth;i++){
    days.push(i);
  }

  return (
    <div>
      <button className="prev-next-btn" onClick={handlePrevious}>Previous</button>
      <span>{year} {month}</span>
      <button className="prev-next-btn" onClick={handleNext}>Next</button>
      <table className="calendar-table">
        <tbody>
          {days.map(day => {
            return (
              <tr>
                <td className={`calendar-day ${day === selectedDay ? "selected" : ""}`} onClick={() => handleClick(day)}>
                  {day}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Calendar;
