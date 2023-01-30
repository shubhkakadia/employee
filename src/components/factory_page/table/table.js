import React, { useEffect, useMemo, useState } from "react";
import ViewEmployee from "../viewEmployee/viewEmployee";
import "./table.css";
import employeeImg from "../../../assets/user_default.png";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectEmployee } from "../../state/actions/selectedEmployee";
import { createAttendance } from "../../state/actions/createAttendance";
import { getDailyAttendanceOfFactory } from "../../state/actions/getDailyAttendance";
import { updateDailyAttendance } from "../../state/actions/updateDailyAttendance";
import moment from "moment";

export default function Table(props) {
  const dailyAttendance = useSelector((state) => state.dailyAttendance.data);
  const selected_factory = useSelector(
    (state) => state.selectedFactory.selected
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [viewEmployeeToggle, setViewEmployeeToggle] = useState("");
  const [searchText, setSearchText] = useState("");
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const [stillWorkingToggle, setStillWorkingToggle] = useState("Still Working");
  const [dataArr, setDataArr] = useState(props.props);
  const [stillWorkingArr, setStillWorkingArr] = useState([]);
  const [searchedArr, setSearchedArr] = useState([]);
  const [punchedEmployeeList, setPunchedEmployeeList] = useState([]);
  const dispatch = useDispatch();
  const date = new Date();

  const handleSearch = () => {
    let arr = [];
    let searchArr = [];
    if (
      stillWorkingToggle === "Still Working" ||
      stillWorkingToggle === "Not Working"
    ) {
      searchArr = stillWorkingArr;
    } else {
      searchArr = props.props;
    }
    searchArr?.forEach((item) => {
      if (
        item.FirstName?.toLowerCase().includes(searchText) ||
        item.PhoneNo?.toString().includes(searchText) ||
        item.LastName?.toLowerCase().includes(searchText) ||
        item.ID?.toString().includes(searchText)
      ) {
        arr.push(item);
      }
    });
    setDataArr(arr);
    setSearchedArr(arr);
  };

  const handleFilter = () => {
    let searchArr = [];
    let arr = [];
    if (searchText !== "") {
      searchArr = searchedArr;
    } else {
      searchArr = props.props;
    }
    if (stillWorkingToggle === "Still Working") {
      searchArr?.forEach((item) => {
        if (item.StillWorking === "Yes") {
          arr.push(item);
        }
      });
      setDataArr(arr);
      setStillWorkingArr(arr);
    } else if (stillWorkingToggle === "Not Working") {
      searchArr?.forEach((item) => {
        if (item.StillWorking === "No") {
          arr.push(item);
        }
      });
      setDataArr(arr);
      setStillWorkingArr(arr);
    } else {
      if (searchText !== "") {
        setDataArr(searchedArr);
      } else {
        setDataArr(props.props);
      }
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => handleSearch(), [props.props, searchText]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => handleFilter(), [props.props, stillWorkingToggle]);

  const currentRecords = dataArr.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(dataArr.length / recordsPerPage);
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  useEffect(() => {
    if (!viewEmployeeToggle) {
      props.onClose();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewEmployeeToggle]);

  useEffect(() => {
    setCurrentPage(1);
    setPunchedEmployeeList([]);
    DailyAttendance(dataArr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.props]);

  useEffect(() => {
    if (dailyAttendance?.EmployeeList?.length > 0) {
      setPunchedEmployeeList(dailyAttendance?.EmployeeList);
    } else {
      setPunchedEmployeeList([]);
    }
  }, [dailyAttendance]);

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  async function DailyAttendance(dataArr) {
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    const params = {
      date: `${date.getFullYear()}-${month}-${date.getDate()}`,
      Factory: selected_factory.Name,
    };
    await dispatch(getDailyAttendanceOfFactory(params));
  }

  function handleViewEmployee(item) {
    setViewEmployeeToggle(item);
    dispatch(selectEmployee(item));
    props.onView();
  }

  function savePunchIns() {
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    const createNewAttendance = {
      date: `${date.getFullYear()}-${month}-${date.getDate()}`,
      EmployeeList: punchedEmployeeList,
      Factory: dataArr[0]?.Factory,
    };
    if (dailyAttendance?.EmployeeList?.length > 0) {
      dispatch(updateDailyAttendance(createNewAttendance));
    } else {
      dispatch(createAttendance(createNewAttendance));
    }
  }

  function handlePunchOut(ID) {
    const temp = punchedEmployeeList;
    const index = temp.findIndex((e) => e.ID === ID);
    if (index > -1) {
      temp[index].End = moment(new Date().getTime()).format(
        "YYYY-MM-DD hh:mm:ss"
      );
      temp[index].WorkType = "Half"
    }
    return temp;
  }

  function handle_photo(item) {
    if (item.Photo !== "") {
      return item.Photo;
    } else {
      return employeeImg;
    }
  }

  return (
    <>
      {viewEmployeeToggle ? (
        <ViewEmployee
          props={viewEmployeeToggle}
          onClose={() => setViewEmployeeToggle(false)}
        />
      ) : (
        <div className="tableContent shadow-lg ">
          <div>
            <div className="searchBar">
              <div className="form-floating">
                <input
                  id="search"
                  className="form-control"
                  placeholder="temp"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <label>
                  Search Employee by ID or first name or last name or phone no
                </label>
              </div>
            </div>
            <div className="filterToggle">
              <div className="filterToggle2">
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {stillWorkingToggle}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setStillWorkingToggle("All")}>
                      All
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setStillWorkingToggle("Not Working")}
                    >
                      Not Working
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setStillWorkingToggle("Still Working")}
                    >
                      Still Working
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>

          {currentRecords.length > 0 ? (
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Phone No.</th>
                  <th scope="col">Address</th>
                  <th scope="col" colSpan="3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentRecords?.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{item.ID}</td>
                      <td>
                        <img
                          src={handle_photo(item)}
                          width={30}
                          height={30}
                          alt=""
                          className="employeeImg"
                        />{" "}
                        {item.FirstName.length > 10
                          ? item.FirstName.substring(0, 10) + "..."
                          : item.FirstName}
                      </td>
                      <td>
                        {item.LastName.length > 10
                          ? item.LastName.substring(0, 10) + "..."
                          : item.LastName}
                      </td>
                      <td>{item.PhoneNo}</td>
                      <td>
                        {item.Address.length > 10
                          ? item.Address.substring(0, 10) + "..."
                          : item.Address}
                      </td>
                      <td>
                        <i
                          onClick={() => handleViewEmployee(item)}
                          className="bi bi-eye icon"
                        ></i>
                      </td>
                      <td>
                        <i
                          onClick={() => props.onEdit(item)}
                          className="bi bi-pencil icon"
                        ></i>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => props.onRemove(item)}
                        >
                          <i className="bi bi-trash icon"></i>
                        </button>
                      </td>
                      {item.StillWorking === "Yes" &&
                      stillWorkingToggle === "Still Working" ? (
                        <td>
                          {punchedEmployeeList.some(
                            (e) =>
                              e.ID === item.ID &&
                              e.End !==
                                moment(new Date().getTime()).format(
                                  "YYYY-MM-DD 23:59:59"
                                )
                          ) ? (
                            <div style={{ width: "65%" }}>
                              Punched For Today
                            </div>
                          ) : punchedEmployeeList.some(
                              (e) =>
                                e.ID === item.ID &&
                                e.End ===
                                  moment(new Date().getTime()).format(
                                    "YYYY-MM-DD 23:59:59"
                                  )
                            ) ? (
                            <button
                              className="btn btn-warning btn-sm"
                              onClick={() => {
                                setPunchedEmployeeList([
                                  ...handlePunchOut(item.ID),
                                ]);
                              }}
                            >
                              Punch Out
                            </button>
                          ) : (
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() => {
                                setPunchedEmployeeList([
                                  ...punchedEmployeeList,
                                  {
                                    ID: item.ID,
                                    Start: moment(new Date().getTime()).format(
                                      "YYYY-MM-DD hh:mm:ss"
                                    ),
                                    End: moment(new Date().getTime()).format(
                                      "YYYY-MM-DD 23:59:59"
                                    ),
                                    WorkType: "Full"
                                  },
                                ]);
                              }}
                            >
                              Punch In
                            </button>
                          )}
                        </td>
                      ) : (
                        <></>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="p-3">No Search Results</div>
          )}

          <nav aria-label="Page navigation example">
            <div className="savePunch">
              <button
                className="btn btn-success"
                onClick={() => savePunchIns()}
              >
                Save Punch
              </button>
            </div>
            {nPages > 1 ? (
              <ul className="pagination">
                <li className="page-item">
                  <div
                    onClick={prevPage}
                    className="page-link"
                    aria-label="Previous"
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </div>
                </li>
                {pageNumbers.map((pgNumber) => (
                  <li
                    key={pgNumber}
                    className={`page-item ${
                      currentPage === pgNumber ? "active" : ""
                    } `}
                  >
                    <div
                      onClick={() => setCurrentPage(pgNumber)}
                      className="page-link"
                    >
                      {pgNumber}
                    </div>
                  </li>
                ))}
                <li className="page-item">
                  <div
                    onClick={nextPage}
                    className="page-link"
                    aria-label="Next"
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </div>
                </li>
              </ul>
            ) : (
              <></>
            )}
          </nav>
        </div>
      )}
    </>
  );
}
