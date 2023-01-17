import { useDispatch, useSelector } from "react-redux";
import Factory from "../factory/factory";
import altImg from "../../assets/user_default.png";
import "./sidebar.css";
import { loggedOut } from "../state/actions/userLogin";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";
import { fetchFactories } from "../state/actions/factoryList";

export default function Sidebar(props) {
  const loggedInUser = useSelector((state) => state.loggedInUser.data);
  const factory_list = useSelector((state) => state.factoryList.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [factoryList, setFactoryList] = useState([]);

  function settings() {
    navigate("/settings");
  }

  function logOut() {
    dispatch(loggedOut());
    navigate("/");
  }

  useEffect(() => {
    dispatch(fetchFactories);
    if (factory_list) {
      setFactoryList(factory_list);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [factory_list]);

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
              <div>{loggedInUser.FirstName}</div>
            </div>
          </Link>

          <div className="iconName">
            <Dropdown className="dropdown">
              <Dropdown.Toggle id="dropdown-basic"></Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => settings()}>
                  Settings
                </Dropdown.Item>
                <Dropdown.Item onClick={() => logOut()}>Log Out</Dropdown.Item>
                {/* <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div>
          <div className="border-top border-opacity line"></div>
        </div>
        <div className="factoryList">
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
