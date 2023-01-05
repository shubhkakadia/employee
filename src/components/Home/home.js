import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchEmployeesAll } from "../state/actions/employeeListAll";
import { fetchFactories } from "../state/actions/factoryList";
import AddFactoryForm from "./factory_page/addFactoryForm/addFactoryForm";
import "./home.css";
import Sidebar from "./sidebar";

export default function Home() {
  const loggedInUser = useSelector((state) => state.userList.data);
  const [addFactoryToggle, setAddFactoryToggle] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    inValidLogin();
    dispatch(fetchEmployeesAll());
    dispatch(fetchFactories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleAddFactory() {
    setAddFactoryToggle(true);
    console.log("add");
  }

  function inValidLogin() {
    if (loggedInUser === "") {
      navigate("/");
    }
  }

  return (
    <>
      <div className="homeBody">
        <Sidebar props={""} onAdd={() => handleAddFactory()} />
        {addFactoryToggle ? (
          <AddFactoryForm props={""} onClose={() => setAddFactoryToggle(false)} />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
