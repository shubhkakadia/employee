import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createFactory } from "../../state/actions/createFactory";
import Sidebar from "../../sidebar/sidebar";
import "./addFactoryForm.css";
import { selectFactory } from "../../state/actions/selectFactory";
import Loading from "../../landingPage/loading";

export default function AddFactoryForm() {
  const navigate = useNavigate();
  const [id, setID] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState("");
  const [fileLarge, setFileLarge] = useState(false);
  const dispatch = useDispatch();

  const factoryList = useSelector((state) => state.factoryList.data);
  const factoryListError = useSelector((state) => state.factoryList.error);
  const factoryListLoading = useSelector((state) => state.factoryList.error);

  function close() {
    navigate(`/${name.replace(/ +/g, "_")}`);
  }

  useEffect(() => {
    generateID();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function generateID() {
    var initialID = 1;

    if (factoryList.length < 1) {
      setID(initialID);
    } else {
      setID(factoryList[factoryList.length - 1].ID + 1);
    }
  }

  function validation() {
    var errorCounter = 0;
    if (name === "") {
      document.getElementById("Name").classList.add("is-invalid");
      errorCounter += 1;
    } else {
      document.getElementById("Name").classList.remove("is-invalid");
    }

    if (address === "") {
      document.getElementById("Address").classList.add("is-invalid");
      errorCounter += 1;
    } else {
      document.getElementById("Address").classList.remove("is-invalid");
    }
    if (errorCounter > 0) {
      return false;
    }
    return true;
  }

  async function save(e) {
    e.preventDefault();
    if (validation()) {
      const newFactory = {
        ID: id,
        Name: name,
        Address: address,
        Photo: photo,
      };
      await dispatch(createFactory(newFactory));
      console.log(factoryListError);
      console.log(factoryList);
      if (factoryListError !== "") {
        document.getElementById("Photo").classList.add("is-invalid");
        setFileLarge(true);
      } else if (!factoryListError) {
        console.log("false");
        setFileLarge(false);
        document.getElementById("Photo").classList.remove("is-invalid");
        dispatch(selectFactory(newFactory));
        close();
      }
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
        setPhoto(base64);
        return base64;
      };
    }
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
                    id="Name"
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
      </div>
    </div>
  );
}
