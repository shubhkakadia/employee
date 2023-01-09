import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchEmployeesAll } from "../state/actions/employeeListAll";
import { fetchFactories } from "../state/actions/factoryList";
import AddFactoryForm from "./factory_page/addFactoryForm/addFactoryForm";
import "./home.css";
import Sidebar from "./sidebar";
// import img1 from '../../assets/forest.jpg'
// import img2 from '../../assets/forest2.jpg'



export default function Home() {
  const loggedInUser = useSelector((state) => state.userList.data);
  const [addFactoryToggle, setAddFactoryToggle] = useState(false);
  // const [bgImage, setBgImage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    inValidLogin();
    dispatch(fetchEmployeesAll());
    dispatch(fetchFactories());

    // images()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   document.getElementById("homeBody").style.backgroundImage=`url(${bgImage})`;
  // }, [bgImage])
  

  function handleAddFactory() {
    setAddFactoryToggle(true);
    console.log("add");
  }

  function inValidLogin() {
    if (loggedInUser === "") {
      navigate("/");
    }
  }

  // function images() {
  //   const imgArray = [img1, img2];
  //   // the random images
  //   var randomNumber = Math.floor(Math.random() * imgArray.length);
  //   // display the images()
  //   console.log(imgArray[randomNumber]);
  //   setBgImage(imgArray[randomNumber]);
  //     // "images/" + selectedImages;
  // }

  return (
    <>
      <div id="homeBody" className="homeBody">
        <Sidebar props={""} onAdd={() => handleAddFactory()} />
        {addFactoryToggle ? (
          <AddFactoryForm
            props={""}
            onClose={() => setAddFactoryToggle(false)}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
