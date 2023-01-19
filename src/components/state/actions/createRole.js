import axios from "axios";
import { ROLE_DATA } from "../types";

export const createNewRole = (data) => (dispatch) => {
  dispatch(load());
  var config = {
    method: 'post',
    url: 'http://localhost:5000/role/create',
    headers: { },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    dispatch(success(response.data.response));
  })
  .catch(function (error) {
    console.log(error);
    dispatch(error(error));
  });
};

export const load = () => ({
  type: ROLE_DATA.load,
});

export const success = (data) => ({
  type: ROLE_DATA.success,
  payload: data,
});

export const error = (error) => ({
  type: ROLE_DATA.error,
  payload: error,
});
