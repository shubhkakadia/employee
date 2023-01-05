import { EMPLOYEE_LIST_ALL } from "../types"

const initialState = {
    load: false,
    data: "",
    error: ""
}

export const employeeListAllReducer = (state = initialState, action) => {
    switch (action.type){
        case EMPLOYEE_LIST_ALL.load:
            return{
                ...state, load: true
            }
        case EMPLOYEE_LIST_ALL.success:
            return{
                ...state, data: action.payload, load: false
            }
        case EMPLOYEE_LIST_ALL.error:
            return{
                ...state, error: action.payload, load: false
            }
        default: return state
    }
}