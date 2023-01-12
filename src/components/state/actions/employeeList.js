import axios from "axios";
import { EMPLOYEE_LIST } from "../types";

export const fetchEmployees = (factory) => (dispatch) => {
  dispatch(load());
  var config = {
    method: "get",
    url: `http://localhost:5000/employee/getbyfactory/${factory}`,
    headers: {},
  };

  axios(config)
    .then(function (response) {
      console.log(response.data.response);
      dispatch(success(response.data.response));
    })
    .catch(function (error) {
      console.log(error);
      dispatch(error(error));
    });
};

export const load = () => ({
  type: EMPLOYEE_LIST.load,
});

export const success = (data) => ({
  type: EMPLOYEE_LIST.success,
  payload: data,
});

export const error = (error) => ({
  type: EMPLOYEE_LIST.error,
  payload: error,
});
