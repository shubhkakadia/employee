import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchEmployeesAll } from "../../../state/actions/employeeListAll";
import "./addUserFrom.css";

export default function AddUserForm(props) {
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [village, setVillage] = useState("");
  const [address, setAddress] = useState("");
  const [villageAddress, setVillageAddress] = useState("");
  const [reference, setReference] = useState("");
  const [joinDate, setJoinDate] = useState("");
  const [stillWorking, setStillWorking] = useState("");
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
  const [editEmployee, setEditEmployee] = useState("");
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
    setJoinDate(employee.JoinDate);
    setLeaveDate(employee.LeaveDate);
    setStillWorking(employee.StillWorking);
    setPhoneNo(employee.PhoneNo);
    setDob(employee.DoB);
    setPhoto(employee.Photo);
    setAdhaarNo(employee.AdhaarNo);
    setAccountNo(employee.AccountNo);
    setBankName(employee.BankName);
    setIFSC(employee.IFSC);
    setNote(employee.Note);
    setEditEmployee(employee);
  }

  function employeeData(e) {
    e.preventDefault();
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
      AdhaarNo: adhaarNo,
      BankName: bankName,
      IFSC: IFSC,
      AccountNo: accountNo,
      Note: note,
    };

    if (props.props.edit !== "") {
      let newArr = props.props.employeeData;
      var employeeIndex = newArr.indexOf(editEmployee);
      newArr[employeeIndex] = newData;
      storeEmployee(newArr);
    } else {
      storeEmployee([...props.props.employeeData, newData]);
    }
    getEmployees();
    clearData();
    generateID();
  }

  function storeEmployee(value) {
    localStorage.setItem("employees", JSON.stringify(value));
    dispatch(fetchEmployeesAll);
  }

  function getEmployees() {
    dispatch(fetchEmployeesAll());
  }

  function generateID() {
    var initialID = (d.getFullYear() - 2000) * 1000;
    if (props.props.employeeData.length < 1) {
      setId(initialID + 1);
    } else {
      setId(
        props.props.employeeData[props.props.employeeData.length - 1].ID + 1
      );
    }
  }

  useEffect(() => {
    if (stillWorking === "Yes") {
      document.getElementById("leaveDate").setAttribute("disabled", true);
      setLeaveDate("");
    } else {
      document.getElementById("leaveDate").removeAttribute("disabled", true);
    }
  }, [stillWorking]);

  function handleCheckBox(e) {
    if (e === true) {
      setStillWorking("Yes");
    } else {
      setStillWorking("No");
    }
  }

  return (
    <div>
      <div id="employeeForm">
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
                  className="form-control"
                  placeholder="temp"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
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
                />
                <label>Last Name</label>
              </div>
            </div>

            <div className="inline">
              <div className="form-floating">
                <input
                  className="form-control"
                  placeholder="temp"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
                <label>Phone No.</label>
              </div>
            </div>
          </div>

          <div className="content">
            <div className="inline">
              <div className="form-floating">
                <input
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
                  size={35}
                  className="form-control"
                  placeholder="temp"
                  value={adhaarNo}
                  onChange={(e) => setAdhaarNo(e.target.value)}
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
                />
                <label>Reference</label>
              </div>
            </div>
          </div>

          <div className="content">
            <div className="inline">
              <div className="form-floating">
                <input
                  size={40}
                  className="form-control"
                  placeholder="temp"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <label>Address</label>
              </div>
            </div>

            <div className="inline">
              <div className="form-floating">
                <input
                  className="form-control"
                  placeholder="temp"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                />
                <label>Village</label>
              </div>
            </div>

            <div className="inline">
              <div className="form-floating">
                <input
                  size={40}
                  className="form-control"
                  placeholder="temp"
                  value={villageAddress}
                  onChange={(e) => setVillageAddress(e.target.value)}
                />
                <label>Village Address</label>
              </div>
            </div>
          </div>

          <div className="content">
            <div className="dates">
              <div className="form-floating">
                <input
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
                  onChange={(e) => setPhoto(e.target.value)}
                />
                <label>Photo</label>
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
                  onChange={(e) => setIFSC(e.target.value)}
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
                  onChange={(e) => setAccountNo(e.target.value)}
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
                />
                <label>Note</label>
              </div>
            </div>
          </div>

          <div className="content">
            <div className="inline">
              <button
                id="submitBtn"
                className="btn btn-danger"
                onClick={() => props.onClose()}
              >
                Cancel
              </button>
            </div>
            <div className="inline">
              <button id="submitBtn" className="btn btn-success" type="submit">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
