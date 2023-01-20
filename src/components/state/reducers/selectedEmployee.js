import { SELECTED_EMPLOYEE } from "../types";

const initialState = {
  selected: "",
};

export const selectedEmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_EMPLOYEE.selected:
      return {
        ...state,
        selected: action.payload,
      };
    default:
      return state;
  }
};
