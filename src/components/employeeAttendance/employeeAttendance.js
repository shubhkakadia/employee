import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../sidebar/sidebar";
import { employeeAttendaceHistory } from "../state/actions/getEmployeeAttendanceHistory";
import Calendar from "./calendar";
import "./employeeAttendance.css";

export default function EmployeeAttendance() {
  const selected_employee = useSelector(
    (state) => state.selectedEmployee.selected
  );
  const employeeAttendace = useSelector(
    (state) => state.employeeAttendaceHistory.data
  );
  const [calProps, setCalProps] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    console.log({ ID: selected_employee.ID });
    dispatch(employeeAttendaceHistory({ ID: selected_employee.ID }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCalProps({
      attendanceHistory: employeeAttendace,
    });
  }, [employeeAttendace]);

  return (
    <div>
      <div className="homeBody">
        <div className="left">
          <Sidebar />
        </div>
        <div className="right">
          <Calendar props={calProps} />
        </div>
      </div>
    </div>
  );
}
