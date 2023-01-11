import axios from "axios";
import { EMPLOYEE_LIST_ALL } from "../types";

export const deleteEmployee = (id) => (dispatch) => {
    dispatch(load());
  
    var config = {
      method: "post",
      url: `http://localhost:5000/employee/delete/${id}`,
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
    type: EMPLOYEE_LIST_ALL.load
})

export const success = (data) => ({
    type: EMPLOYEE_LIST_ALL.success, 
    payload: data
})

export const error = (error) => ({
    type: EMPLOYEE_LIST_ALL.error,
    payload: error
})