import { EMPLOYEE_LIST } from "../types"

export const fetchEmployees = (data, factory) => (dispatch) => {
    dispatch(load());
    if (data){
        const filteredArr = []
        data.forEach((item) => {
            if(item.Factory === factory){
                filteredArr.push(item);
            }
        })
        dispatch(success(filteredArr));
    }
    else{
        dispatch(error('Faield to Fetch'))
    }
}

export const load = () => ({
    type: EMPLOYEE_LIST.load
})

export const success = (data) => ({
    type: EMPLOYEE_LIST.success, 
    payload: data
})

export const error = (error) => ({
    type: EMPLOYEE_LIST.error,
    payload: error
})