import axios from "axios";
import { USER } from "../types";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const userLogin = (user) => (dispatch) => {
  dispatch(load());
  var config = {
    method: "post",
    url: "http://localhost:5000/user/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: user,
  };

  axios(config)
    .then(function (response) {
      cookies.set("TOKEN", response.data.token, {
        path: "/",
      });
      console.log(response.data);
      dispatch(success(response.data.user));
    })
    .catch(function (error) {
      console.log(error);
      dispatch(error(error));
    });
};

export const loggedOut = () => (dispatch) => {
  dispatch(success(""));
  dispatch(error(""));
  cookies.remove("TOKEN");
};

export const load = () => ({
  type: USER.load,
});

export const success = (data) => ({
  type: USER.success,
  payload: data,
});

export const error = (error) => ({
  type: USER.error,
  payload: error,
});
