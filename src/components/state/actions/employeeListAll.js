import axios from "axios";
import { EMPLOYEE_LIST_ALL } from "../types"

export const fetchEmployeesAll = () => (dispatch) => {
    dispatch(load());
    const options = {
        method: 'GET',
        url: 'http://localhost:5000/employee/get',
    }

    axios.request(options).then(function (response){
        // console.log(response.data);
        dispatch(success(response.data.response))
    }).catch(function(err) {
        console.log(err);
        dispatch(error('Faield to Fetch'))
    })
}

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