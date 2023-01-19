import { ROLE_DATA } from "../types";

const initialState = {
  load: false,
  data: "",
  error: "",
};

export const roleDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ROLE_DATA.load:
      return {
        ...state,
        load: true,
      };
    case ROLE_DATA.success:
      return {
        ...state,
        data: action.payload,
        error: "",
        load: false,
      };
    case ROLE_DATA.error:
      return {
        ...state,
        error: action.payload,
        load: false,
      };
    default:
      return state;
  }
};
