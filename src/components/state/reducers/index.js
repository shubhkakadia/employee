import { combineReducers } from "redux";
import { employeeListReducer } from "./employeeList";
import { employeeListAllReducer } from "./employeeListAll";
import { factoryListReducer } from "./factoryList";
import { readAllFactoryEmployeeReducer } from "./readAllFactoryEmployee";
import { roleDataReducer } from "./roleList";
import { SelectFactoryReducer } from "./selectedFactory";
import { userLoginReducer } from "./userLogin";

const reducers = combineReducers({
  loggedInUser: userLoginReducer,
  factoryList: factoryListReducer,
  selectedFactory: SelectFactoryReducer,
  employeeList: employeeListReducer,
  employeeListAll: employeeListAllReducer,
  allFactoryEmployee: readAllFactoryEmployeeReducer,
  roleData: roleDataReducer,
});

export default reducers;
