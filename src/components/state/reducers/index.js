import { combineReducers } from "redux";
import { employeeListReducer } from "./employeeList";
import { employeeListAllReducer } from "./employeeListAll";
import { factoryListReducer } from "./factoryList";
import { SelectFactoryReducer } from "./selectedFactory";
import { userListReducer } from "./userList";

const reducers = combineReducers({
    userList: userListReducer,
    factoryList: factoryListReducer,
    selectedFactory: SelectFactoryReducer,
    employeeList: employeeListReducer,
    employeeListAll: employeeListAllReducer
})

export default reducers;