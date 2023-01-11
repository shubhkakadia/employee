import React from "react";
import "./removeItem.css";

export default function removeItem(props) {
  console.log(props.props);
  return (
    <div id="removeItemContent">
      <div id="message">
        <div>
          <div className="cancel">
            <button
              to="/"
              className="btn btn-danger btn-sm"
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
          <div className="txt">{props.props.message}</div>

          <div className="removeitembtns">
            <button className="btn btn-danger" onClick={() => props.onRemove()}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
