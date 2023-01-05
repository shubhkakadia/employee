import React from "react";
import altImg from "../../../assets/factory_default.png";
import './factory.css'
import '../sidebar.css'
import { useDispatch } from "react-redux";
import { selectFactory } from "../../state/actions/selectFactory";
import { Link } from "react-router-dom";

export default function Factory(props) {
  const dispatch = useDispatch()
  return (
    <>
      <div className="link">
        <Link to={"/" + props.props.Name.replace(/ +/g, "_")} onClick={() => dispatch(selectFactory(props.props))}>
          <div className="iconName im">
            <img src={altImg} alt={altImg} width={30} height={30} className="factoryImg"/>
          </div>
          <div className="iconName nm">{props.props.Name}</div>
        </Link>
      </div>
    </>
  );
}
