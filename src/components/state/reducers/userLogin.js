import { USER } from "../types";

const initialState = {
  load: false,
  data: "",
  error: "",
};

export const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER.load:
      return {
        ...state,
        load: true,
      };
    case USER.success:
      return {
        ...state,
        data: action.payload,
        load: false,
      };
    case USER.error:
      return {
        ...state,
        error: action.payload,
        load: false,
      };
    default:
      return state;
  }
};
