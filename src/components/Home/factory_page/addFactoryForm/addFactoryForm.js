import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createFactory } from "../../../state/actions/createFactory";
import Sidebar from "../../sidebar";
import "./addFactoryForm.css";

export default function AddFactoryForm() {
  const navigate = useNavigate();
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState("");
  const dispatch = useDispatch();

  const factoryList = useSelector((state) => state.factoryList.data);

  function close() {
    navigate(`/${name}`);
  }

  useEffect(() => {
    generateID();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function generateID() {
    var initialID = 1;

    if (factoryList.length < 1) {
      setID(initialID)
    }
    else{
      setID(factoryList[factoryList.length -1].ID +1);
    }
  }

  function save(e) {
    e.preventDefault()
    const newFactory = {
      ID: id,
      Name: name,
      Address: address,
      Photo: photo
    };
    console.log(newFactory);
    dispatch(createFactory(newFactory));
    close();
  }

  return (
    <div className="homeBody">
      <div className="left">
        <Sidebar />
      </div>
      <div className="right">
        <div id="factoryForm">
          <form>
            <div className="content1">
              <h2>Add New Factory</h2>
            </div>

            <div className="content1">
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={address}
                    onChange={(e) => setAddress(String(e.target.value))}
                    maxLength={64}
                  />
                  <label>Address</label>
                </div>
              </div>
            </div>

            <div className="content1">
              <div className="form-floating">
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setPhoto(e.target.value)}
                />
                <label>Photo</label>
              </div>
            </div>

            <div className="content1">
              <div className="inline">
                <button
                  className="btn btn-success submitBtn"
                  onClick={(e) => save(e)}
                >
                  Save
                </button>
              </div>

              <div className="inline">
                <button
                  className="btn btn-danger submitBtn"
                  onClick={() => close()}
                >
                  Close
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
