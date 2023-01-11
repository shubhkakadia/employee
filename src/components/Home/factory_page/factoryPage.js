import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../../state/actions/employeeList";
import Sidebar from "../sidebar";
import AddUserForm from "./addUserForm/addUserForm";
import "./factoryPage.css";
import Table from "./table/table";
import Loading from "../../landingPage/loading";
import AddFactoryForm from "./addFactoryForm/addFactoryForm";
import { deleteEmployee } from "../../state/actions/deleteEmployee";
import RemoveItem from "./removeItem/removeItem";
import { deleteFactory } from "../../state/actions/deleteFactory";
import { useNavigate } from "react-router-dom";

export default function FactoryPage() {
  const selected_factory = useSelector(
    (state) => state.selectedFactory.selected
  );
  const employeeAllArray = useSelector((state) => state.employeeListAll.data);
  const employee_list = useSelector((state) => state.employeeList.data);
  const isLoading = useSelector((state) => state.employeeList.load);
  const dispatch = useDispatch();
  const [formDialog, setFormDialog] = useState(false);
  const [addEmployeeBtn, setAddEmployeeBtn] = useState(true);
  const [removeFactoryBtn, setRemoveFactoryBtn] = useState(true);
  const [employeeArr, setEmployeeArr] = useState([]);
  const [removeItemToggle, setRemoveItemToggle] = useState(false);
  const [parems, setParems] = useState({
    factory: selected_factory.Name,
    edit: "",
    employeeData: employeeAllArray,
  });
  const [addFactoryToggle, setAddFactoryToggle] = useState(false);
  const removeItemProps = {
    message: `Are you sure you want to remove ${selected_factory.Name} factory? This will delete all employees aswell.`,
  };
  const navigate = useNavigate()

  useEffect(() => {
    console.log(employeeAllArray);
    dispatch(fetchEmployees(selected_factory.Name));
    setParems({
      factory: selected_factory.Name,
      edit: "",
      employeeData: employeeAllArray,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected_factory, employeeAllArray]);

  useEffect(() => {
    setEmployeeArr(employee_list);
  }, [employee_list]);

  useEffect(() => {
    addBtnToggle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formDialog]);

  useEffect(() => {
    if (removeItemToggle) {
      setAddEmployeeBtn(false);
      setRemoveFactoryBtn(false);
    } else {
      setAddEmployeeBtn(true);
      setRemoveFactoryBtn(true);
    }
  }, [removeItemToggle]);

  function addFactory() {
    console.log("add");
    setAddFactoryToggle(true);
  }

  function addBtnToggle() {
    if (formDialog === false) {
      setAddEmployeeBtn(true);
    } else {
      setAddEmployeeBtn(false);
    }
  }

  function editEmployee(item) {
    setFormDialog(true);
    setParems({ ...parems, edit: item });
  }

  function addEmployee() {
    setFormDialog(true);
    setAddEmployeeBtn(true);
    setParems({ ...parems, edit: "" });
  }

  function handleRemoveEmployee(employee) {
    dispatch(deleteEmployee(employee.ID));
  }

  function removeFactory() {
    setRemoveItemToggle(false);
    dispatch(deleteFactory(selected_factory));
    navigate('/home');
  }

  return (
    <div>
      <div className="homeBody">
        <div className="sidebarData">
          <Sidebar props={""} onAdd={() => addFactory()} />
        </div>
        <div className="pageContent">
          <div className="headingBtn">
            <div className="heading">{selected_factory.Name}</div>
            {addEmployeeBtn &&  removeFactoryBtn && (
              <div>
                <div className="addBtn">
                  <button
                    onClick={() => setRemoveItemToggle(true)}
                    className="btn btn-danger"
                  >
                    Remove Factory
                  </button>
                </div>
                <div className="addBtn">
                  <button
                    onClick={() => addEmployee()}
                    className="btn btn-success"
                  >
                    Add Employee
                  </button>
                </div>
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="employeeListLoader">
              <Loading />
            </div>
          ) : removeItemToggle ? (
            <div className="sidebarData pageData">
              <RemoveItem
                props={removeItemProps}
                onClose={() => setRemoveItemToggle(false)}
                onRemove={() => removeFactory()}
              />
            </div>
          ) : formDialog ? (
            <div className="sidebarData pageData">
              <AddUserForm
                props={parems}
                onClose={() => setFormDialog(false)}
              />
            </div>
          ) : addFactoryToggle ? (
            <AddFactoryForm
              props=""
              onClose={() => setAddFactoryToggle(false)}
            />
          ) : employeeArr.length > 0 ? (
            <div className="employeeDataTable">
              <div className="center">
                <Table
                  props={employeeArr}
                  onEdit={(item) => editEmployee(item)}
                  onClose={() => setAddEmployeeBtn(true)}
                  onView={() => setAddEmployeeBtn(false)}
                  onRemove={(employee) => handleRemoveEmployee(employee)}
                />
              </div>
            </div>
          ) : (
            <div className="noData">No Data Found!</div>
          )}
        </div>
      </div>
    </div>
  );
}
