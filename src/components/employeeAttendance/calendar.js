import moment from "moment";
import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import "./calendar.css";

export default function Calendar(props) {
  console.log("calprops", props);
  const [date, setDate] = useState(new Date());
  const month = date.getMonth();
  const year = date.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const [moreInfoToggle, setMoreInfoToggle] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const attendancePresent = (date) => {
    let comparedate = "";
    comparedate = `${year}-${month + 1}-${date}`;
    if (
      props.props.attendanceHistory?.some(
        (e) => moment(e.Start).format("YYYY-M-DD") === comparedate
      )
    ) {
      return true;
    }
    return false;
  };

  const moreInfo = (data) => {
    if (new Date(startTime).getDate() === data || startTime === "") {
      if (moreInfoToggle) {
        setMoreInfoToggle(false);
      } else {
        setMoreInfoToggle(true);
      }
    }
    setStartTime("");
    setEndTime("");
    let comparedate = "";
    comparedate = `${year}-${month + 1}-${data}`;
    let obj = props.props.attendanceHistory?.find(
      (e) => moment(e.Start).format("YYYY-M-DD") === comparedate
    );
    if (obj) {
      setStartTime(obj.Start);
      if (obj.End !== "") {
        setEndTime(obj.End);
      }
    }

    console.log(data);
  };

  const nextYear = () => {
    setDate(new Date(year + 1, month, 1));
  };

  const prevYear = () => {
    setDate(new Date(year - 1, month, 1));
  };

  const changeMonth = (monthIndex) => {
    setDate(new Date(year, monthIndex, 1));
  };

  const firstDay = new Date(year, month, 1);
  const startingDay = firstDay.getDay();

  return (
    <div>
      <div className="calendar-box">
        <div className="calendar">
          <div className="calendar-header">
            <div>
              <div className="year-selector">
                <button
                  className="d-inline btn btn-primary btn-sm"
                  onClick={prevYear}
                >
                  &lt;&lt;
                </button>
                <h2 className="d-inline p-5">{year}</h2>
                <button
                  className="d-inline btn btn-primary btn-sm"
                  onClick={nextYear}
                >
                  &gt;&gt;
                </button>
              </div>
              <div className="month-selector">
                <div className="dropdown">
                  <Dropdown id="dropdown-basic">
                    <Dropdown.Toggle>{monthNames[month]}</Dropdown.Toggle>

                    <Dropdown.Menu>
                      {monthNames.map((monthName, index) => {
                        return (
                          <Dropdown.Item
                            onClick={() => changeMonth(index)}
                            key={index}
                          >
                            {monthName}
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
            <div className="cal">
              <table>
                <thead>
                  <tr>
                    <th>Sun</th>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                  </tr>
                </thead>
                <tbody>
                  {Array(Math.ceil((daysInMonth + startingDay) / 7))
                    .fill(null)
                    .map((_, row) => (
                      <tr key={row}>
                        {Array(7)
                          .fill(null)
                          .map((_, col) => {
                            const day = row * 7 + col - startingDay + 1;
                            return (
                              <td key={col} onClick={(e) => moreInfo(day)}>
                                {day > 0 && day <= daysInMonth ? day : null}
                                {day > 0 &&
                                day <= daysInMonth &&
                                !attendancePresent(day) ? (
                                  <div className="dot1">
                                    <span className="dot-no"></span>
                                  </div>
                                ) : null}
                                {day > 0 &&
                                day <= daysInMonth &&
                                attendancePresent(day) ? (
                                  <div className="dot1">
                                    <span className="dot-yes"></span>
                                  </div>
                                ) : null}
                              </td>
                            );
                          })}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {moreInfoToggle ? (
          <div>
            <div>
              Start Time:
              {startTime !== "" ? (
                moment(startTime).format("hh:mm")
              ) : (
                <>No Punch Records!</>
              )}
            </div>
            <div>
              End Time:
              {moment(endTime).format("hh:mm") === "11:59" ||
              moment(endTime).format("hh:mm") === "Invalid date" ? (
                <>No Punch Records!</>
              ) : (
                moment(endTime).format("hh:mm")
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
