import axios from "axios";
import { EMPLOYEE_ATTENDANCE_HISTORY } from "../types";

export const employeeAttendaceHistory = (data) => (dispatch) => {
  dispatch(load());

  var config = {
    method: "post",
    url: "http://localhost:5000/attendance/getemployeedata",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(response.data);
      dispatch(success(response.data.response));
    })
    .catch(function (err) {
      console.log(err);
      dispatch(error(err));
    });
};

export const load = () => ({
  type: EMPLOYEE_ATTENDANCE_HISTORY.load,
});

export const success = (data) => ({
  type: EMPLOYEE_ATTENDANCE_HISTORY.success,
  payload: data,
});

export const error = (error) => ({
  type: EMPLOYEE_ATTENDANCE_HISTORY.error,
  payload: error,
});
