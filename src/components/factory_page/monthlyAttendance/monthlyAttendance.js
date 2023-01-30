import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faFileArrowDown,
  faStar,
  faStarHalf,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useMemo, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../sidebar/sidebar";
import "./monthlyAttendance.css";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { selectEmployee } from "../../state/actions/selectedEmployee";
import Calendar from "./temp";
import { CheckLg } from "react-bootstrap-icons";

export default function MonthlyAttendance() {
  const selected_factory = useSelector(
    (state) => state.selectedFactory.selected
  );
  const monthlyAttendance = useSelector(
    (state) => state.monthlyAttendance.data
  );

  const [stillWorkingArr, setStillWorkingArr] = useState([]);
  const [stillWorkingToggle, setStillWorkingToggle] = useState("Still Working");
  const employee_list = useSelector((state) => state.employeeList.data);
  const [date, setDate] = useState(new Date());
  const month = date.getMonth();
  const year = date.getFullYear();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [actionState, setActionState] = useState(
    <FontAwesomeIcon icon={faStar} />
  );
  const actionsArray = [
    <FontAwesomeIcon icon={faStar} />,
    <FontAwesomeIcon icon={faStarHalf} />,
    "",
  ];
  const [monthlyAttendanceArr, setMonthlyAttendanceArr] = useState([]);
  const WorkTypes = ["", "Half", "Full"];

  useEffect(() => {
    let TempArr = [];
    stillWorkingArr.forEach((elements) => {
      TempArr = [...TempArr, reArrangeAttendance(elements)];
    });
    setMonthlyAttendanceArr(TempArr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const handleFilter = () => {
    let arr = [];
    if (stillWorkingToggle === "Still Working") {
      employee_list?.forEach((item) => {
        if (item.StillWorking === "Yes") {
          arr.push(item);
        }
      });
      setStillWorkingArr(arr);
    } else if (stillWorkingToggle === "Not Working") {
      employee_list?.forEach((item) => {
        if (item.StillWorking === "No") {
          arr.push(item);
        }
      });
      setStillWorkingArr(arr);
    } else {
      setStillWorkingArr(employee_list);
    }
  };
  // const [halfDayArr, setHalfDayArr] = useState([]);
  // const [fullDayArr, setFullDayArr] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => handleFilter(), [stillWorkingToggle]);

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

  const nextYear = () => {
    setDate(new Date(year + 1, month, 1));
  };

  const prevYear = () => {
    setDate(new Date(year - 1, month, 1));
  };

  const changeMonth = (monthIndex) => {
    setDate(new Date(year, monthIndex, 1));
  };

  //   const firstDay = new Date(year, month, 1);
  //   const startingDay = firstDay.getDay();
  //   let day = startingDay - 1;

  function reArrangeAttendance(emp) {
    let array = [];
    monthlyAttendance.forEach((element) => {
      if (
        moment(new Date(element.date)).format("YYYY-MM") ===
        moment(date).format("YYYY-MM")
      ) {
        let tempObj = element.EmployeeList.find((e) => e.ID === emp.ID);
        if (tempObj) {
          array = [
            ...array,
            {
              ID: tempObj.ID,
              date: new Date(tempObj?.Start).getDate(),
              WorkType: tempObj?.WorkType,
            },
          ];
        }
      }
    });
    return array;
  }

  function changeAttendance(emp, date, index) {
    console.log(emp, date, index);
    var WorkTypeIndex = 0;
    var tempMonthlyAttendaceArr = monthlyAttendanceArr;
    tempMonthlyAttendaceArr[index].forEach((element) => {
      if (element.date === date) {
        console.log(WorkTypes.indexOf(element.WorkType));
        // WorkTypeIndex = WorkTypes.indexOf(element.WorkType);
        element.WorkType = WorkTypes[WorkTypeIndex++ % WorkTypes.length];
      }
    });
    console.log(tempMonthlyAttendaceArr);
    setMonthlyAttendanceArr([...tempMonthlyAttendaceArr]);
  }

  console.log(monthlyAttendanceArr);
  return (
    <div>
      <div className="homeBody">
        <div className="left">
          <Sidebar />
        </div>
        <div className="right">
          <div className="heading">
            <div id="heading2">
              <h3 className="d-inline">{selected_factory.Name}</h3>
              <div className="d-inline heading3">
                <h1>Monthly Report</h1>
              </div>
            </div>
            <h6>{selected_factory.Address}</h6>
          </div>

          <div className="monthlyReport">
            <div>
              <div className="">
                <button
                  className="d-inline btn btn-primary btn-sm"
                  onClick={prevYear}
                >
                  &lt;&lt;
                </button>
                <h2 className="d-inline year">{year}</h2>
                <button
                  className="d-inline btn btn-primary btn-sm"
                  onClick={nextYear}
                >
                  &gt;&gt;
                </button>
              </div>
              <div className="">
                <div className="monthSelector">
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

              <div className="stillWorkingToggle">
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {stillWorkingToggle}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setStillWorkingToggle("All")}>
                      All
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setStillWorkingToggle("Not Working")}
                    >
                      Not Working
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setStillWorkingToggle("Still Working")}
                    >
                      Still Working
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <div>
                <FontAwesomeIcon
                  className="fa-2x downloadIcon"
                  onClick={(e) => console.log("download")}
                  icon={faFileArrowDown}
                />
              </div>
              <div className="tb">
                <table className="table table-hover">
                  <thead>
                    {/* <tr>
                      <th></th>
                      <th></th>
                      {Array(daysInMonth)
                        .fill(null)
                        .map((item, i) => {
                          day += 1;
                          if (day > 6) {
                            day = 0;
                          }
                          return <th className="day">{dayNames[day]}</th>;
                        })}
                    </tr> */}
                    <tr>
                      <th>ID</th>
                      <th>First Name</th>
                      {Array(daysInMonth)
                        .fill(null)
                        .map((item, i) => {
                          return <th key={i}>{i + 1}</th>;
                        })}
                      <th>Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    {stillWorkingArr.map((employee, j) => {
                      return (
                        <tr key={j}>
                          <th
                            style={{ cursor: "pointer" }}
                            onClick={(e) => {
                              dispatch(selectEmployee(employee));
                              navigate(
                                `/${selected_factory.Name.replace(
                                  / +/g,
                                  "_"
                                )}/${employee.ID}`
                              );
                            }}
                            scope="row"
                          >
                            {employee.ID}
                          </th>
                          <th
                            style={{ cursor: "pointer" }}
                            onClick={(e) => {
                              dispatch(selectEmployee(employee));
                              navigate(
                                `/${selected_factory.Name.replace(
                                  / +/g,
                                  "_"
                                )}/${employee.ID}`
                              );
                            }}
                            scope="row"
                          >
                            {employee.FirstName.length > 10
                              ? employee.FirstName.substring(0, 10) + "..."
                              : employee.FirstName}
                          </th>
                          {Array(daysInMonth)
                            .fill(null)
                            .map((item, i) => {
                              if (
                                monthlyAttendanceArr[j]?.some(
                                  (e) => e.date === i + 1
                                )
                              ) {
                                if (
                                  monthlyAttendanceArr[j]?.some(
                                    (e) =>
                                      e.WorkType === "Half" && e.date === i + 1
                                  )
                                ) {
                                  return (
                                    <td
                                      onClick={() =>
                                        changeAttendance(employee, i + 1, j)
                                      }
                                      key={i}
                                    >
                                      {actionsArray[1]}
                                    </td>
                                  );
                                } else if (
                                  monthlyAttendanceArr[j]?.some(
                                    (e) =>
                                      e.WorkType === "Full" && e.date === i + 1
                                  )
                                ) {
                                  return (
                                    <td
                                      onClick={() =>
                                        changeAttendance(employee, i + 1, j)
                                      }
                                      key={i}
                                    >
                                      {actionsArray[0]}
                                    </td>
                                  );
                                }
                              } else {
                                return (
                                  <td
                                    onClick={() =>
                                      changeAttendance(employee, i + 1, j)
                                    }
                                    key={i}
                                  >
                                    {actionsArray[2]}
                                  </td>
                                );
                              }
                            })}
                          <td>
                            {monthlyAttendanceArr[j]?.length > 0 ? (
                              monthlyAttendanceArr[j]?.length
                            ) : (
                              <></>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
