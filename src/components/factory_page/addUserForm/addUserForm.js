import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createEmployee } from "../../state/actions/createEmployee";
import "./addUserForm.css";
import moment from "moment";
import { editEmployee } from "../../state/actions/editEmployee";
import { Dropdown } from "react-bootstrap";

export default function AddUserForm(props) {
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [village, setVillage] = useState("");
  const [address, setAddress] = useState("");
  const [villageAddress, setVillageAddress] = useState("");
  const [reference, setReference] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [stillWorking, setStillWorking] = useState("No");
  const [leaveDate, setLeaveDate] = useState("");
  const [photo, setPhoto] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [factory, setFactory] = useState();
  const [dob, setDob] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [bankName, setBankName] = useState("");
  const [IFSC, setIFSC] = useState("");
  const [note, setNote] = useState("");
  const [adhaarNo, setAdhaarNo] = useState("");
  const [tempLeaveDate, setTempLeaveDate] = useState("");
  const [role, setRole] = useState("Choose Role");
  const dispatch = useDispatch();
  const d = new Date();

  useEffect(() => {
    setFactory(props.props.factory);
    generateID();
    if (props.props.edit !== "") {
      edit(props.props.edit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.props]);

  useEffect(() => {
    if (stillWorking === "Yes") {
      setTempLeaveDate(leaveDate);
      document.getElementById("leaveDate").setAttribute("disabled", true);
      setLeaveDate("");
      document.getElementById("exampleCheck1").setAttribute("checked", true);
    } else {
      if (!props.props.edit) {
        setLeaveDate(tempLeaveDate);
      }
      document.getElementById("leaveDate").removeAttribute("disabled", true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stillWorking]);

  function clearData() {
    setId("");
    setFirstName("");
    setLastName("");
    setAddress("");
    setVillage("");
    setVillageAddress("");
    setReference("");
    setJoinDate("");
    setStillWorking("");
    setLeaveDate("");
    setPhoneNo("");
    setPhoto("");
    setDob("");
    setAdhaarNo("");
    setBankName("");
    setIFSC("");
    setAccountNo("");
    setNote("");
  }

  function edit(employee) {
    setId(employee.ID);
    setFirstName(employee.FirstName);
    setLastName(employee.LastName);
    setVillage(employee.Village);
    setAddress(employee.Address);
    setVillageAddress(employee.VillageAddress);
    setReference(employee.Reference);
    setJoinDate(moment(employee.JoinDate).format("YYYY-MM-DD"));
    setLeaveDate(moment(employee.LeaveDate).format("YYYY-MM-DD"));
    setStillWorking(employee.StillWorking);
    setPhoneNo(employee.PhoneNo);
    setDob(moment(employee.DoB).format("YYYY-MM-DD"));
    setPhoto(employee.Photo);
    setAdhaarNo(employee.AdhaarNo);
    setAccountNo(employee.AccountNo);
    setBankName(employee.BankName);
    setIFSC(employee.IFSC);
    setNote(employee.Note);
    setRole(employee.Role);
  }

  function employeeData(e) {
    e.preventDefault();
    if (validate_input()) {
      if (role === "Choose Role") {
        setRole("");
      }
      const newData = {
        ID: id,
        Factory: factory,
        FirstName: firstName,
        LastName: lastName,
        DoB: dob,
        Village: village,
        Address: address,
        VillageAddress: villageAddress,
        Reference: reference,
        JoinDate: joinDate,
        StillWorking: stillWorking,
        LeaveDate: leaveDate,
        Photo: photo,
        PhoneNo: phoneNo,
        RoleName: role,
        AdhaarNo: adhaarNo,
        BankName: bankName,
        IFSC: IFSC,
        AccountNo: accountNo,
        Note: note,
      };

      if (props.props.edit !== "") {
        dispatch(editEmployee(newData));
      } else {
        console.log(newData);
        dispatch(createEmployee(newData));
      }
      clearData();
      generateID();
      props.onClose();
    }
  }

  function generateID() {
    var initialID = (d.getFullYear() - 2000) * 10000;
    var lastEmpsID =
      props.props.employeeData[props.props.employeeData.length - 1]?.ID;

    if (
      props.props.employeeData.length < 1 ||
      Math.floor(lastEmpsID / 10000) + 2000 !== d.getFullYear()
    ) {
      setId(initialID + 1);
    } else {
      setId(
        props.props.employeeData[props.props.employeeData.length - 1].ID + 1
      );
    }
  }

  function handleCheckBox(e) {
    if (e === true) {
      setStillWorking("Yes");
    } else {
      setStillWorking("No");
    }
  }

  function validate_input() {
    var errorCounter = 0;
    if (!firstName) {
      document.getElementById("firstName").classList.add("is-invalid");
      errorCounter += 1;
    } else {
      document.getElementById("firstName").classList.remove("is-invalid");
    }

    if (!phoneNo) {
      document.getElementById("phoneNo").classList.add("is-invalid");
      errorCounter += 1;
    } else {
      document.getElementById("phoneNo").classList.remove("is-invalid");
    }

    if (dob === "Invalid date" || !dob) {
      document.getElementById("DoB").classList.add("is-invalid");
      errorCounter += 1;
    } else {
      document.getElementById("DoB").classList.remove("is-invalid");
    }

    if (!adhaarNo) {
      document.getElementById("AdhaarNo").classList.add("is-invalid");
      errorCounter += 1;
    } else {
      document.getElementById("AdhaarNo").classList.remove("is-invalid");
    }

    if (!address) {
      document.getElementById("Address").classList.add("is-invalid");
      errorCounter += 1;
    } else {
      document.getElementById("Address").classList.remove("is-invalid");
    }

    if (!village) {
      document.getElementById("Village").classList.add("is-invalid");
      errorCounter += 1;
    } else {
      document.getElementById("Village").classList.remove("is-invalid");
    }

    if (!villageAddress) {
      document.getElementById("VillageAddress").classList.add("is-invalid");
      errorCounter += 1;
    } else {
      document.getElementById("VillageAddress").classList.remove("is-invalid");
    }

    if (joinDate === "Invalid date" || !joinDate) {
      document.getElementById("joinDate").classList.add("is-invalid");
      errorCounter += 1;
    } else {
      document.getElementById("joinDate").classList.remove("is-invalid");
    }

    if (stillWorking === "No" && !leaveDate) {
      document.getElementById("leaveDate").classList.add("is-invalid");
      errorCounter += 1;
    } else {
      document.getElementById("leaveDate").classList.remove("is-invalid");
    }

    if (errorCounter > 0) {
      return false;
    }

    return true;
  }

  function convertImgtoBase64(e) {
    const file = e.target.files[0];
    if (file) {
      var filereader = new FileReader();
      filereader.readAsDataURL(file);
      filereader.onload = function (evt) {
        var base64 = evt.target.result;
        console.log(base64);
        setPhoto(base64);
        return base64;
      };
    }
  }

  return (
    <div>
      <div>
        <div id="employeeForm">
          {/* <img src={photo} alt="" /> */}
          <form onSubmit={(e) => employeeData(e)}>
            <div className="content">
              {props.props.edit ? (
                <div className="addHeading">Edit Existing Employee</div>
              ) : (
                <div className="addHeading">Add New Employee</div>
              )}
            </div>

            <div className="content">
              <div className="inline">
                <div className="form-floating">
                  <input
                    className="form-control"
                    id="floatingInput"
                    placeholder="temp"
                    value={id}
                    disabled
                  />
                  <label htmlFor="floatingInput">ID</label>
                </div>
              </div>

              <div className="inline">
                <div className="form-floating">
                  <input
                    id="firstName"
                    className="form-control"
                    placeholder="temp"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onKeyPress={(event) => {
                      if (!/^[a-zA-Z ]+$/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    maxLength={20}
                  />
                  <label>First Name</label>
                </div>
              </div>

              <div className="inline">
                <div className="form-floating">
                  <input
                    className="form-control"
                    placeholder="temp"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    maxLength={20}
                    onKeyPress={(event) => {
                      if (!/^[a-zA-Z ]+$/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                  <label>Last Name</label>
                </div>
              </div>

              <div className="inline">
                <div className="form-floating">
                  <input
                    id="phoneNo"
                    className="form-control"
                    placeholder="temp"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    maxLength={10}
                    minLength={10}
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                  <label>Phone No.</label>
                </div>
              </div>
            </div>

            <div className="content">
              <div className="inline">
                <div className="form-floating">
                  <input
                    id="DoB"
                    type="date"
                    className="form-control"
                    placeholder="temp"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                  <label>Date of Birth</label>
                </div>
              </div>

              <div className="inline">
                <div className="form-floating">
                  <input
                    id="AdhaarNo"
                    size={35}
                    className="form-control"
                    placeholder="temp"
                    value={adhaarNo}
                    onChange={(e) => setAdhaarNo(e.target.value)}
                    maxLength={16}
                    minLength={16}
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                  <label>Adhaar No.</label>
                </div>
              </div>

              <div className="inline">
                <div className="form-floating">
                  <input
                    className="form-control"
                    placeholder="temp"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    onKeyPress={(event) => {
                      if (!/^[a-zA-Z ]+$/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                  <label>Reference</label>
                </div>
              </div>
            </div>

            <div className="content">
              <div className="inline">
                <div className="form-floating">
                  <input
                    id="Address"
                    size={40}
                    className="form-control"
                    placeholder="temp"
                    value={address}
                    onChange={(e) => setAddress(String(e.target.value))}
                    maxLength={64}
                  />
                  <label>Address</label>
                </div>
              </div>

              <div className="inline">
                <div className="form-floating">
                  <input
                    id="Village"
                    className="form-control"
                    placeholder="temp"
                    value={village}
                    onChange={(e) => setVillage(String(e.target.value))}
                    maxLength={20}
                  />
                  <label>Village</label>
                </div>
              </div>

              <div className="inline">
                <div className="form-floating">
                  <input
                    id="VillageAddress"
                    size={40}
                    className="form-control"
                    placeholder="temp"
                    value={villageAddress}
                    onChange={(e) => setVillageAddress(String(e.target.value))}
                    maxLength={64}
                  />
                  <label>Village Address</label>
                </div>
              </div>
            </div>

            <div className="content">
              <div className="dates">
                <div className="form-floating">
                  <input
                    id="joinDate"
                    type="date"
                    className="form-control"
                    placeholder="temp"
                    value={joinDate}
                    onChange={(e) => setJoinDate(e.target.value)}
                  />
                  <label>Join Date</label>
                </div>
              </div>

              <div className="dates">
                <div className="form-floating">
                  <input
                    id="leaveDate"
                    type="date"
                    className="form-control"
                    placeholder="temp"
                    value={leaveDate}
                    onChange={(e) => setLeaveDate(e.target.value)}
                  />
                  <label>Leave Date</label>
                </div>
              </div>

              <div className="dates">
                <div className="form-floating">
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => convertImgtoBase64(e)}
                  />
                  <label>Photo</label>
                </div>
              </div>

              <div className="dates">
                <div className="roleDropDown">
                  <Dropdown id="dropdown-basic">
                    <Dropdown.Toggle>{role}</Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => setRole("Choose Role")}>
                        Choose Role
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setRole("Supervisor")}>
                        Supervisor
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => setRole("Manager")}>
                        Manager
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>

            <div className="content">
              <div className="form-check p-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                  value={stillWorking}
                  onClick={(e) => handleCheckBox(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Still Working?
                </label>
              </div>
            </div>

            <div className="content">
              <div className="inline">
                <div className="form-floating">
                  <input
                    className="form-control"
                    placeholder="temp"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    maxLength={20}
                    onKeyPress={(event) => {
                      if (!/^[a-zA-Z ]+$/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                  <label>Bank Name</label>
                </div>
              </div>

              <div className="inline">
                <div className="form-floating">
                  <input
                    size={30}
                    className="form-control"
                    placeholder="temp"
                    value={IFSC}
                    onChange={(e) => setIFSC(String(e.target.value))}
                    maxLength={11}
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                  <label>IFSC Code</label>
                </div>
              </div>

              <div className="inline">
                <div className="form-floating">
                  <input
                    size={35}
                    className="form-control"
                    placeholder="temp"
                    value={accountNo}
                    onChange={(e) => setAccountNo(String(e.target.value))}
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                  <label>Account No.</label>
                </div>
              </div>

              <div className="inline">
                <div className="form-floating">
                  <textarea
                    size={50}
                    className="form-control"
                    placeholder="temp"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    onKeyPress={(event) => {
                      if (!/^[a-zA-Z ]+$/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                  <label>Note</label>
                </div>
              </div>
            </div>

            <div className="content">
              <div className="inline">
                <button
                  className="btn btn-outline-danger ActionBtn"
                  onClick={() => props.onClose()}
                >
                  Cancel
                </button>
              </div>
              <div className="inline">
                <button
                  id="submitBtn"
                  className="btn btn-outline-success ActionBtn"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
