import axios from "axios";
import { DAILY_ATTENDANCE } from "../types";

export const createAttendance = (data) => (dispatch) => {
  dispatch(load());

  var config = {
    method: "post",
    url: "http://localhost:5000/attendance/create",
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
    .catch(function (error) {
      console.log(error);
      dispatch(error(error));
    });
};

export const load = () => ({
  type: DAILY_ATTENDANCE.load,
});

export const success = (data) => ({
  type: DAILY_ATTENDANCE.success,
  payload: data,
});

export const error = (error) => ({
  type: DAILY_ATTENDANCE.error,
  payload: error,
});
