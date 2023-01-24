import { DAILY_ATTENDANCE } from "../types";

const initialState = {
  load: false,
  data: "",
  error: "",
};

export const dailyAttendanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case DAILY_ATTENDANCE.load:
      return {
        ...state,
        load: true,
      };
    case DAILY_ATTENDANCE.success:
      return {
        ...state,
        data: action.payload,
        load: false,
      };
    case DAILY_ATTENDANCE.error:
      return {
        ...state,
        error: action.payload,
        load: false,
      };
    default:
      return state;
  }
};
