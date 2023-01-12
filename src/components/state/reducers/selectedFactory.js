import { SELECTED_FACTORY } from "../types";

const initialState = {
  selected: "",
};

export const SelectFactoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_FACTORY.selected:
      return {
        ...state,
        selected: action.payload,
      };
    default:
      return state;
  }
};
