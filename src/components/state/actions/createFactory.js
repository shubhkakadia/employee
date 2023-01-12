import axios from "axios";
import { FACTORY_LIST } from "../types";

export const createFactory = (data) => (dispatch) => {
  dispatch(load());

  var config = {
    method: "post",
    url: "http://localhost:5000/factory/create",
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
  type: FACTORY_LIST.load,
});

export const success = (data) => ({
  type: FACTORY_LIST.success,
  payload: data,
});

export const error = (error) => ({
  type: FACTORY_LIST.error,
  payload: error,
});
