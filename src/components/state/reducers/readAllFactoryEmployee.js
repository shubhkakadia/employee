import { ALL_FACTORY_EMPLOYEE } from "../types";

const initialState = {
  load: false,
  data: "",
  error: "",
};

export const readAllFactoryEmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_FACTORY_EMPLOYEE.load:
      return {
        ...state,
        load: true,
      };
    case ALL_FACTORY_EMPLOYEE.success:
      return {
        ...state,
        data: action.payload,
        error: "",
        load: false,
      };
    case ALL_FACTORY_EMPLOYEE.error:
      return {
        ...state,
        error: action.payload,
        load: false,
      };
    default:
      return state;
  }
};
