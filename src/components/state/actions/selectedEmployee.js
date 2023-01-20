import { SELECTED_EMPLOYEE } from "../types";

export const selectEmployee = (employee) => (dispatch) => {
  dispatch(select(employee));
};

export const select = (factory) => ({
  type: SELECTED_EMPLOYEE.selected,
  payload: factory,
});
