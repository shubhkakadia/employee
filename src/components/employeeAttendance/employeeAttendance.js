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
  const selected_factory = useSelector(
    (state) => state.selectedFactory.selected
  );
  const roles = useSelector((state) => state.roleData.data);
  const [dailySalary, setDailySalary] = useState(0);
  const [calProps, setCalProps] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(employeeAttendaceHistory({ ID: selected_employee.ID }));
    setDailySalary(
      roles.find((e) => e.RoleName === selected_employee.RoleName)?.DailyWages
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCalProps({
      attendanceHistory: employeeAttendace,
      dailySalary: dailySalary,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeAttendace]);

  return (
    <div>
      <div className="homeBody">
        <div className="left">
          <Sidebar />
        </div>
        <div className="right">
          <div className="attendanceBlock1">
            <div className="heading">
              <div id="heading2">
                <h3 className="d-inline">{selected_factory.Name}</h3>
              </div>
              <h6>{selected_factory.Address}</h6>
            </div>
            <div className="attendanceBlock2">
              <div className="employeeInfo">
                <h2>{selected_employee.ID}</h2>
                <h6>
                  Name: {selected_employee.FirstName}{" "}
                  {selected_employee.LastName}
                </h6>
                <h6>Phone No: {selected_employee.PhoneNo}</h6>
                <h6>Address: {selected_employee.Address}</h6>
                <h6>
                  Role:{" "}
                  {selected_employee.RoleName
                    ? selected_employee.RoleName
                    : "No Role Assigned"}
                </h6>
              </div>
              <Calendar props={calProps} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
