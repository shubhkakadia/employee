import React from "react";
import employeeImg from "../../../../assets/user_default.png";
import "./viewEmployee.css";
import moment from 'moment'

export default function ViewEmployee(props) {
  return (
    <div>
      <div className="content">
        <div className="employeeCard shadow-lg">
          <div className="employeeImgCard shadow-lg">
            <div className="borderradius">
              <div>
                <img
                  src={employeeImg}
                  className="responsive employeeImgC"
                  height={225}
                  width={225}
                  alt="..."
                />
              </div>
            </div>
            <div>
              <div className="cardid">{props.props.ID}</div>
            </div>
          </div>

          <div className="employeeDetailsCard">
            <div className="closeBtn">
              <div className="content shadow-lg">
                <button
                  to="/"
                  className="btn btn-danger"
                  onClick={() => props.onClose()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-x-lg"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="leftSide">
              <div className="cardTxt">
                <div className="inline fromTable lb">First Name: </div>
                <div className="inline fromTable">{props.props.FirstName}</div>
              </div>

              <div className="cardTxt">
                <div className="inline fromTable lb">Last Name: </div>
                <div className="inline fromTable">{props.props.LastName}</div>
              </div>

              <div className="cardTxt">
                <div className="inline fromTable lb">Phone No: </div>
                <div className="inline fromTable">{props.props.PhoneNo}</div>
              </div>

              <div className="cardTxt">
                <div className="inline fromTable lb">Address: </div>
                <div className="inline fromTable">{props.props.Address}</div>
              </div>

              <div className="cardTxt">
                <div className="inline lb">Date of Birth: </div>
                <div className="inline">{moment(props.props.DoB).format('DD/MM/YYYY')}</div>
              </div>

              <div className="cardTxt">
                <div className="inline lb">Adhaar No: </div>
                <div className="inline">{props.props.AdhaarNo}</div>
              </div>

              <div className="cardTxt">
                <div className="inline lb">Village: </div>
                <div className="inline">{props.props.Village}</div>
              </div>

              {props.props.Reference ? (
                <div className="cardTxt">
                  <div className="inline lb">Reference: </div>
                  <div className="inline ">{props.props.Reference}</div>
                </div>
              ) : (
                <></>
              )}

              <div className="cardTxt">
                <div className="inline lb">Village Address: </div>
                <div className="inline">{props.props.VillageAddress}</div>
              </div>
            </div>

            <div className="rightSide">
              <div className="cardTxt">
                <div className="inline lb">Join Date: </div>
                <div className="inline">{moment(props.props.JoinDate).format('DD/MM/YYYY')}</div>
              </div>

              {props.props.LeaveDate ? (
                <div className="cardTxt">
                  <div className="inline lb">Leave Date: </div>
                  <div className="inline">{moment(props.props.LeaveDate).format('DD/MM/YYYY')}</div>
                </div>
              ) : (
                <></>
              )}

              <div className="cardTxt">
                <div className="inline lb">Still Working?: </div>
                <div className="inline">{props.props.StillWorking}</div>
              </div>

              <div className="cardTxt">
                <div className="inline lb">Bank Name: </div>
                <div className="inline">{props.props.BankName}</div>
              </div>

              <div className="cardTxt">
                <div className="inline lb">IFSC Code: </div>
                <div className="inline">{props.props.IFSC}</div>
              </div>

              <div className="cardTxt">
                <div className="inline lb">Account No: </div>
                <div className="inline">{props.props.AccountNo}</div>
              </div>

              {props.props.Note ? (
                <div className="cardTxt">
                  <div className="inline lb">Note: </div>
                  <div className="inline">{props.props.Note}</div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
