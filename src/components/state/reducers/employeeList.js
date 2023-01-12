import { EMPLOYEE_LIST } from "../types";

const initialState = {
  load: false,
  data: "",
  error: "",
};

export const employeeListReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMPLOYEE_LIST.load:
      return {
        ...state,
        load: true,
      };
    case EMPLOYEE_LIST.success:
      return {
        ...state,
        data: action.payload,
        load: false,
      };
    case EMPLOYEE_LIST.error:
      return {
        ...state,
        error: action.payload,
        load: false,
      };
    default:
      return state;
  }
};
