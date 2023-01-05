import { EMPLOYEE_LIST_ALL } from "../types"

export const fetchEmployeesAll = () => (dispatch) => {
    dispatch(load());
    const data = localStorage.getItem("employees");
    if (data?.length > 0){
        const employees = JSON.parse(data);
        dispatch(success(employees));
    }
    else{
        dispatch(error('failed to Fetch All'))
    }
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