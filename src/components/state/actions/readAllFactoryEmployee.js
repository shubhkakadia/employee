import axios from "axios";
import { ALL_FACTORY_EMPLOYEE } from "../types";

export const fetchAllFactoryEmployee = () => (dispatch) => {
  dispatch(load());
  var config = {
    method: "get",
    url: "http://localhost:5000/factory/allfactoryemployee",
    headers: {},
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
  type: ALL_FACTORY_EMPLOYEE.load,
});

export const success = (data) => ({
  type: ALL_FACTORY_EMPLOYEE.success,
  payload: data,
});

export const error = (error) => ({
  type: ALL_FACTORY_EMPLOYEE.error,
  payload: error,
});
