import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../sidebar/sidebar";
import { createNewRole } from "../state/actions/createRole";
import { deleteRole } from "../state/actions/deleteRole";
import { editRole } from "../state/actions/editRole";
import { fetchRoleData } from "../state/actions/roleList";
import "./appSettings.css";

export default function AppSettings() {
  const roleData = useSelector((state) => state.roleData.data);
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDailyWages, setNewRoleDailyWages] = useState("");
  const dispatch = useDispatch();
  const [roleArr, setRoleArr] = useState([]);
  const [editing, setEditing] = useState(false);

  function clearInput() {
    setNewRoleDailyWages("");
    setNewRoleName("");
  }

  useEffect(() => {
    dispatch(fetchRoleData());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setRoleArr(roleData);
  }, [roleData]);

  function deleteSelectedRole(role) {
    dispatch(deleteRole(role));
  }

  function editSelectedRole(role) {
    setNewRoleName(role.RoleName);
    setEditing(true);
    setNewRoleDailyWages(role.DailyWages);
    document.getElementById("RoleName").setAttribute("disabled", true);
    document.getElementById("errorMessage").setAttribute("hidden", true);
  }

  function addNew(e) {
    e.preventDefault();
    if (editing) {
      const newRoleObj = {
        RoleName: newRoleName,
        DailyWages: newRoleDailyWages,
      };
      dispatch(editRole(newRoleObj));
      setEditing(false);
      document.getElementById("RoleName").removeAttribute("disabled");
    } else if (validate_input() && !alreadyExists()) {
      console.log(true);
      const newRoleObj = {
        RoleName: newRoleName,
        DailyWages: newRoleDailyWages,
      };

      dispatch(createNewRole(newRoleObj));
    }
    clearInput();
  }

  function alreadyExists() {
    let exists = false;
    roleData.forEach((role) => {
      if (role.RoleName.toUpperCase() === newRoleName.toUpperCase()) {
        document.getElementById("errorMessage").removeAttribute("hidden");
        exists = true;
      }
    });
    if (exists === false) {
      document.getElementById("errorMessage").setAttribute("hidden", true);
      return false;
    } else {
      return true;
    }
  }

  function validate_input() {
    var errorCounter = 0;

    if (!newRoleName) {
      document.getElementById("RoleName").classList.add("is-invalid");
      errorCounter += 1;
    } else {
      document.getElementById("RoleName").classList.remove("is-invalid");
    }

    if (!newRoleDailyWages) {
      document.getElementById("DailyWages").classList.add("is-invalid");
      errorCounter += 1;
    } else {
      document.getElementById("DailyWages").classList.remove("is-invalid");
    }

    if (errorCounter > 0) {
      return false;
    }
    return true;
  }

  return (
    <div className="homeBody">
      <div className="left">
        <Sidebar />
      </div>
      <div className="right">
        <div id="appSetingsForm">
          <h2 className="content1">Role List</h2>
          <form>
            <div className="roleListForm">
              {roleArr?.map((role, i) => {
                return (
                  <div key={i}>
                    <div className="roleList">
                      <div className=" roleName p-4">
                        <label>{role.RoleName}</label>
                      </div>

                      <div className=" dailyWages p-4">
                        <label>{role.DailyWages}</label>
                      </div>
                      <div className="removeBtn">
                        <button
                          className="btn btn-sm d-inline"
                          onClick={(e) => {
                            e.preventDefault();
                            editSelectedRole(role);
                          }}
                        >
                          <i class="bi bi-pencil"></i>
                        </button>
                      </div>
                      <div className="removeBtn">
                        <button
                          className="btn btn-danger btn-sm d-inline"
                          onClick={(e) => {
                            e.preventDefault();
                            deleteSelectedRole(role);
                          }}
                        >
                          <i className="bi bi-trash icon"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="content">
              <div className="inline">
                <div className="form-floating">
                  <input
                    id="RoleName"
                    className="form-control"
                    placeholder="temp"
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                    onKeyPress={(event) => {
                      if (!/^[a-zA-Z ]+$/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    maxLength={20}
                  />
                  <label>Role Name</label>
                </div>
              </div>

              <div className="inline">
                <div className="form-floating">
                  <input
                    id="DailyWages"
                    className="form-control"
                    placeholder="temp"
                    value={newRoleDailyWages}
                    onChange={(e) => setNewRoleDailyWages(e.target.value)}
                    maxLength={10}
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                  <label>Daily Wages</label>
                </div>
              </div>

              <div className="inline addRoleBtn">
                <div className="addRoleBtn">
                  <button
                    id="addRoleBtn"
                    className="btn btn-success ActionBtn"
                    onClick={(e) => addNew(e)}
                  >
                    {editing ? "Save" : "Add"}
                  </button>
                </div>
              </div>
            </div>

            <div className="content">
              <div id="errorMessage" hidden>
                Role Already exists in the list
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
