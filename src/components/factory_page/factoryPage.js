import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../state/actions/employeeList";
import Sidebar from "../sidebar/sidebar";
import AddUserForm from "./addUserForm/addUserForm";
import "./factoryPage.css";
import Table from "./table/table";
import Loading from "../landingPage/loading";
import { deleteEmployee } from "../state/actions/deleteEmployee";
import RemoveItem from "./removeItem/removeItem";
import { deleteFactory } from "../state/actions/deleteFactory";
import { useNavigate } from "react-router-dom";
import { PlusLg } from "react-bootstrap-icons";
import { editFactory } from "../state/actions/editFactory";
import { selectFactory } from "../state/actions/selectFactory";
import { Dropdown } from "react-bootstrap";

export default function FactoryPage() {
  const selected_factory = useSelector(
    (state) => state.selectedFactory.selected
  );
  const factoryListError = useSelector((state) => state.factoryList.error);
  const [fileLarge, setFileLarge] = useState(false);
  const factoryListLoading = useSelector((state) => state.factoryList.error);
  const [editfactoryDetails, setEditfactoryDetails] = useState(false);
  const employeeAllArray = useSelector((state) => state.employeeListAll.data);
  const employee_list = useSelector((state) => state.employeeList.data);
  const isLoading = useSelector((state) => state.employeeList.load);
  const dispatch = useDispatch();
  const [formDialog, setFormDialog] = useState(false);
  const [addEmployeeBtn, setAddEmployeeBtn] = useState(true);
  const [employeeArr, setEmployeeArr] = useState([]);
  const [removeItemToggle, setRemoveItemToggle] = useState(false);
  const [parems, setParems] = useState({
    factory: selected_factory.Name,
    edit: "",
    employeeData: employeeAllArray,
  });
  const [removeEmployee, setRemoveEmployee] = useState("");
  const [fName, setFName] = useState(selected_factory.Name);
  const [fAddress, setFAddress] = useState(selected_factory.Address);
  const [fPhoto, setFPhoto] = useState(selected_factory.Photo);
  const [removeItemProps, setRemoveItemProps] = useState({
    message: `Are you sure you want to remove ${selected_factory.Name} factory? This will delete all employees aswell.`,
  });
  const navigate = useNavigate();
  useMemo(() => setEmployeeArr(employee_list), [employee_list]);
  useMemo(() => addBtnToggle(formDialog), [formDialog]);
  useMemo(() => removeBtnToggle(removeItemToggle), [removeItemToggle]);

  useEffect(() => {
    console.log("first")
    dispatch(fetchEmployees(selected_factory.Name));
    setParems({
      factory: selected_factory.Name,
      edit: "",
      employeeData: employeeAllArray,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected_factory, employeeAllArray]);

  function edit_factory(e) {
    e.preventDefault();
    const edit_factory = {
      ID: selected_factory.ID,
      Name: fName,
      Address: fAddress,
      Photo: fPhoto,
      OldName: selected_factory.Name,
    };

    dispatch(editFactory(edit_factory));
    if (factoryListError !== "") {
      document.getElementById("Photo").classList.add("is-invalid");
      setFileLarge(true);
    } else if (!factoryListError) {
      console.log("false");
      setFileLarge(false);
      document.getElementById("Photo").classList.remove("is-invalid");
      setEditfactoryDetails(false);
      navigate("/" + fName.replace(/ +/g, "_"));
      dispatch(selectFactory(edit_factory));
    }
    navigate("/");
  }

  function removeBtnToggle(removeItemToggle){
    if (removeItemToggle) {
      setAddEmployeeBtn(false);
    } else {
      setAddEmployeeBtn(true);
    }
  }

  function addBtnToggle(formDialog) {
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
    setRemoveItemToggle(true);
    setRemoveEmployee(employee);
    setRemoveItemProps({
      message: `Are you sure you want to remove ${employee.FirstName} ${employee.LastName}?`,
    });
    // dispatch(deleteEmployee(employee.ID));
  }

  function removeItem() {
    if (removeEmployee !== "") {
      setRemoveEmployee("");
      setRemoveItemProps({
        message: `Are you sure you want to remove ${selected_factory.Name} factory? This will delete all employees aswell.`,
      });
      setRemoveItemToggle(false);
      dispatch(deleteEmployee(removeEmployee.ID));
    } else {
      setRemoveItemToggle(false);
      dispatch(deleteFactory(selected_factory));
      navigate("/dashboard");
    }
  }

  function convertImgtoBase64(e) {
    const file = e.target.files[0];
    if (file) {
      var filereader = new FileReader();
      filereader.readAsDataURL(file);
      filereader.onload = function (evt) {
        var base64 = evt.target.result;
        console.log(base64);
        setFPhoto(base64);
        return base64;
      };
    }
  }

  return (
    <div>
      <div className="homeBody">
        <div className="left">
          <Sidebar />
        </div>
        <div className="right">
          <div className="headingBtn">
            {addEmployeeBtn && (
              <div className="heading">
                <div id="heading2">
                  <h3 className="d-inline">{selected_factory.Name}</h3>
                  <Dropdown className="dropdown d-inline factoryActions">
                    <Dropdown.Toggle id="dropdown-basic"></Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => setEditfactoryDetails(true)}
                      >
                        Edit Factory Details
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setRemoveItemToggle(true)}>
                        Remove Factory
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <h6>{selected_factory.Address}</h6>
              </div>
            )}
            {addEmployeeBtn && (
              <div>
                {addEmployeeBtn && !isLoading && (
                  <div className="addBtn">
                    <button
                      onClick={() => addEmployee()}
                      className="btn btn-success btn-sm"
                    >
                      <PlusLg size={20} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          {isLoading ? (
            <div className="employeeListLoader">
              <Loading />
            </div>
          ) : editfactoryDetails ? (
            <div className="editForm">
              <form>
                <div className="content1">
                  <h2>Edit Factory Details</h2>
                </div>

                <div className="content1">
                  <div className="inline">
                    <div className="form-floating">
                      <input
                        id="Name"
                        className="form-control"
                        placeholder="temp"
                        onChange={(e) => setFName(e.target.value)}
                      />
                      <label>Factory Name</label>
                    </div>
                  </div>
                </div>

                <div className="content1">
                  <div className="inline">
                    <div className="form-floating">
                      <input
                        id="Address"
                        size={50}
                        className="form-control"
                        placeholder="temp"
                        onChange={(e) => setFAddress(String(e.target.value))}
                        maxLength={64}
                      />
                      <label>Address</label>
                    </div>
                  </div>
                </div>

                <div className="content1">
                  <div className="form-floating">
                    <input
                      id="Photo"
                      type="file"
                      className="form-control"
                      onChange={(e) => convertImgtoBase64(e)}
                    />
                    <label>Photo</label>
                  </div>
                </div>
                {fileLarge ? (
                  <div className="content1">
                    <div>
                      <h6>File Too Large! Try again with smaller file.</h6>
                    </div>
                  </div>
                ) : (
                  <></>
                )}

                <div className="content1">
                  <div className="inline">
                    <button
                      className="btn btn-success submitBtn"
                      onClick={(e) => edit_factory(e)}
                    >
                      Save
                    </button>
                  </div>

                  <div className="inline">
                    <button
                      className="btn btn-danger submitBtn"
                      onClick={() => setEditfactoryDetails(false)}
                    >
                      Close
                    </button>
                  </div>
                  {factoryListLoading ? (
                    <div className="inline">
                      <Loading />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </form>
            </div>
          ) : removeItemToggle ? (
            <div className="sidebarData pageData">
              <RemoveItem
                props={removeItemProps}
                onClose={() => setRemoveItemToggle(false)}
                onRemove={() => removeItem()}
              />
            </div>
          ) : formDialog ? (
            <div className="sidebarData pageData">
              <AddUserForm
                props={parems}
                onClose={() => setFormDialog(false)}
              />
            </div>
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
