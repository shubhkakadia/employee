import { useDispatch, useSelector } from "react-redux";
import Factory from "./factory/factory";
import altImg from "../../assets/user_default.png";
import "./sidebar.css";
import { loggedOut } from "../state/actions/userList";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";

export default function Sidebar(props) {
  const loggedInUser = useSelector((state) => state.userList.data);
  const factory_list = useSelector((state) => state.factoryList.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [factoryList, setFactoryList] = useState([]);

  function logOut() {
    dispatch(loggedOut());
    navigate("/");
  }

  // useEffect(() => {
  //   if (loggedInUser !== "") {
  //     dispatch(fetchFactories());
  //     console.log("first");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    if (factory_list) {
      setFactoryList(factory_list);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [factory_list]);

  //   function createFactory() {
  //     const factoryList = [
  //       {
  //         Id: "1",
  //         Name: "Name 1",
  //         Address: "Address 1"
  //       },
  //       {
  //         Id: "2",
  //         Name: "Name 2",
  //         Address: "Address 2"
  //       },
  //       {
  //         Id: "3",
  //         Name: "Name 3",
  //         Address: "Address 3"
  //       },
  //       {
  //         Id: "4",
  //         Name: "Name 4",
  //         Address: "Address 4"
  //       },
  //       {
  //         Id: "5",
  //         Name: "Name 5",
  //         Address: "Address 5"
  //       },
  //     ];

  //     const toStringUsers = JSON.stringify(factoryList);
  //     console.log("Created")
  //     localStorage.setItem("factory", toStringUsers);
  // //   }
  // useEffect(() => {
  //   createFactory()
  // }, []);

  //   const userImg = loggedInUser.Image;
  return (
    <>
      <div className="sideBar shadow-lg">
        <div className="link">
          <Link to="/">
            <div className="iconName">
              <img
                src={altImg}
                alt={altImg}
                width={40}
                height={40}
                className="factoryImg"
              />
            </div>
            <div className="iconName nm">
              <div>{loggedInUser.Name}</div>
            </div>
          </Link>

          <div className="iconName">
            <Dropdown className="dropdown">
              <Dropdown.Toggle id="dropdown-basic"></Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => logOut()}>Log Out</Dropdown.Item>
                {/* <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div>
          <div className="border-top border-opacity line"></div>
        </div>
        <div>
          {factoryList?.length > 0 &&
            factoryList?.map((item, i) => {
              return (
                <div key={i}>
                    <Factory props={item} />
                </div>
              );
            })}
        </div>
        <div className="addFactoryBtn">
          <button
            onClick={() => navigate("/addfactory")}
            className="btn btn-success"
          >
            Add Factory
          </button>
        </div>
      </div>
    </>
  );
}
