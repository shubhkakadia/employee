import { MONTHLY_ATTENDANCE } from "../types";

const initialState = {
  load: false,
  data: "",
  error: "",
};

export const monthlyAttendanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case MONTHLY_ATTENDANCE.load:
      return {
        ...state,
        load: true,
      };
    case MONTHLY_ATTENDANCE.success:
      return {
        ...state,
        data: action.payload,
        load: false,
      };
    case MONTHLY_ATTENDANCE.error:
      return {
        ...state,
        error: action.payload,
        load: false,
      };
    default:
      return state;
  }
};
