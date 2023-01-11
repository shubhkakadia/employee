import axios from "axios";
import { FACTORY_LIST } from "../types"

export const fetchFactories = () => (dispatch) => {
    dispatch(load());
    var config = {
        method: 'get',
        url: 'http://localhost:5000/factory/get',
        headers: { }
      };
      
      axios(config)
      .then(function (response) {
        console.log(response.data);
        dispatch(success(response.data.response))
      })
      .catch(function (error) {
        console.log(error);
        dispatch(error(error))
      });
      
}

export const load = () => ({
    type: FACTORY_LIST.load
})

export const success = (data) => ({
    type: FACTORY_LIST.success, 
    payload: data
})

export const error = (error) => ({
    type: FACTORY_LIST.error,
    payload: error
})