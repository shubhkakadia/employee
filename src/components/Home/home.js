import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchEmployeesAll } from "../state/actions/employeeListAll";
import { fetchFactories } from "../state/actions/factoryList";
import "./home.css";
import Sidebar from "./sidebar";

export default function Home() {
  const loggedInUser = useSelector((state) => state.userList.data);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    inValidLogin();
    dispatch(fetchEmployeesAll());
    dispatch(fetchFactories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);  

  function inValidLogin() {
    if (loggedInUser === "") {
      navigate("/");
    }
  }

  return (
    <>
      <div id="homeBody" className="homeBody">
        <div className="left">
          <Sidebar />
        </div>

        <div className="right">
        </div>
      </div>
    </>
  );
}
