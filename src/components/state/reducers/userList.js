import { USER_LIST } from "../types";

const initialState = {
  load: false,
  data: "",
  error: "",
};

export const userListReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LIST.load:
      return {
        ...state,
        load: true,
      };
    case USER_LIST.success:
      return {
        ...state,
        data: action.payload,
        load: false,
      };
    case USER_LIST.error:
      return {
        ...state,
        error: action.payload,
        load: false,
      };
    default:
      return state;
  }
};
