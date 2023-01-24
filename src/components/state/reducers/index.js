import { combineReducers } from "redux";
import { dailyAttendanceReducer } from "./dailyAttendance";
import { employeeAttendanceHistory } from "./employeeAttendanceHistory";
import { employeeListReducer } from "./employeeList";
import { employeeListAllReducer } from "./employeeListAll";
import { factoryListReducer } from "./factoryList";
import { monthlyAttendanceReducer } from "./monthlyAttendance";
import { readAllFactoryEmployeeReducer } from "./readAllFactoryEmployee";
import { roleDataReducer } from "./roleList";
import { selectedEmployeeReducer } from "./selectedEmployee";
import { SelectFactoryReducer } from "./selectedFactory";
import { userLoginReducer } from "./userLogin";

const reducers = combineReducers({
  loggedInUser: userLoginReducer,
  factoryList: factoryListReducer,
  selectedFactory: SelectFactoryReducer,
  selectedEmployee: selectedEmployeeReducer,
  employeeList: employeeListReducer,
  employeeListAll: employeeListAllReducer,
  allFactoryEmployee: readAllFactoryEmployeeReducer,
  roleData: roleDataReducer,
  dailyAttendance: dailyAttendanceReducer,
  employeeAttendaceHistory: employeeAttendanceHistory,
  monthlyAttendance: monthlyAttendanceReducer,
});

export default reducers;
