import { EMPLOYEE_ATTENDANCE_HISTORY } from "../types";

const initialState = {
  load: false,
  data: "",
  error: "",
};

export const employeeAttendanceHistory = (state = initialState, action) => {
  switch (action.type) {
    case EMPLOYEE_ATTENDANCE_HISTORY.load:
      return {
        ...state,
        load: true,
      };
    case EMPLOYEE_ATTENDANCE_HISTORY.success:
      return {
        ...state,
        data: action.payload,
        load: false,
      };
    case EMPLOYEE_ATTENDANCE_HISTORY.error:
      return {
        ...state,
        error: action.payload,
        load: false,
      };
    default:
      return state;
  }
};
