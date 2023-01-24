import axios from "axios";
import { MONTHLY_ATTENDANCE } from "../types";

export const getMonthlyAttendance = (data) => (dispatch) => {
  dispatch(load());

  var config = {
    method: "post",
    url: "http://localhost:5000/attendance/getmonth",
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
  type: MONTHLY_ATTENDANCE.load,
});

export const success = (data) => ({
  type: MONTHLY_ATTENDANCE.success,
  payload: data,
});

export const error = (error) => ({
  type: MONTHLY_ATTENDANCE.error,
  payload: error,
});
