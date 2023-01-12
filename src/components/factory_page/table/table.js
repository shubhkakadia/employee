import React, { useEffect, useState } from "react";
import ViewEmployee from "../viewEmployee/viewEmployee";
import "./table.css";

export default function Table(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [viewEmployeeToggle, setViewEmployeeToggle] = useState('');

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = props.props.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nPages = Math.ceil(props.props.length / recordsPerPage);
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [props.props]);

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  function handleViewEmployee(item){
    setViewEmployeeToggle(item);
    props.onView();
  }
  useEffect(() => {
    if (viewEmployeeToggle === false){
      props.onClose()
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewEmployeeToggle])
  
  return (
    <>
      {viewEmployeeToggle ? (
        <ViewEmployee props={viewEmployeeToggle} onClose={() => setViewEmployeeToggle(false)}/>
      ) : (
        <div className="tableContent shadow-lg ">
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
                        src={item.Photo}
                        width={30}
                        height={30}
                        alt=""
                        className="employeeImg"
                      />{" "}
                      {item.FirstName}
                    </td>
                    <td>{item.LastName}</td>
                    <td>{item.PhoneNo}</td>
                    <td>{item.Address}</td>
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
                    <button className="btn btn-danger btn-sm" onClick={() => props.onRemove(item)}>
                      <i
                        className="bi bi-trash icon"
                      ></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {nPages > 1 ? (
            <nav aria-label="Page navigation example">
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
            </nav>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
}
