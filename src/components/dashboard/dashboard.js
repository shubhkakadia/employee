import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./dashboard.css";
import Sidebar from "../sidebar/sidebar";
import { fetchAllFactoryEmployee } from "../state/actions/readAllFactoryEmployee";
import { Doughnut } from "react-chartjs-2";
import { Tooltip, Title, ArcElement, Legend, Chart, Colors } from "chart.js";
import { fetchRoleData } from "../state/actions/roleList";
import { fetchEmployeesAll } from "../state/actions/employeeListAll";

export default function Home() {
  const loggedInUser = useSelector((state) => state.loggedInUser.data);
  const employeeAllArray = useSelector((state) => state.employeeListAll.data);
  const factoryList = useSelector((state) => state.factoryList.data);
  const [empCounter, setEmpCounter] = useState(0);
  const [counterSpeed, setCounterSpeed] = useState(100);
  const allFactoryEmployee = useSelector(
    (state) => state.allFactoryEmployee.data
  );
  const [empCount, setEmpCount] = useState([]);
  const [factorylabel, setFactorylabel] = useState([]);
  // const roles = useSelector((state) => state.roleData.data);
  // const [roleList, setRoleList] = useState({});
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useMemo(() => handlePieChart(), [factoryList]);

  Chart.register(Colors, Tooltip, Title, ArcElement, Legend);
  let date = new Date();
  const data = {
    datasets: [
      {
        data: empCount,
      },
    ],
    labels: factorylabel,
  };

  useEffect(() => {
    if (empCounter !== employeeAllArray.length) {
      setTimeout(() => {
        setEmpCounter(empCounter + 1);
      }, counterSpeed);
      if (empCounter === Math.round((employeeAllArray.length / 100) *80)) {
        setCounterSpeed(400);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  useEffect(() => {
    dispatch(fetchAllFactoryEmployee());
    dispatch(fetchRoleData());
    dispatch(fetchEmployeesAll());
    // salaryData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options = {
    plugins: {
      colors: {
        forceOverride: true,
      },
    },
  };

  function handlePieChart() {
    let factorylabel = [];
    let empCount = [];
    allFactoryEmployee.forEach((item) => {
      factorylabel.push(item.Factory.Name);
      empCount.push(item.EmployeeArr.length);
    });
    setEmpCount(empCount);
    setFactorylabel(factorylabel);
  }

  // function salaryData (){
  //   let roleList = []
  //   let totalExp = 0
  //   roles.forEach((role) => {
  //     let name = role.RoleName
  //     roleList.push()
  //   })

  //   console.log(roleList);
  //   console.log(employeeAllArray);
  //   employeeAllArray.forEach((emp) => {
  //     if (roles.find((e) => e.RoleName === emp.RoleName)){

  //     }
  //   })
  // }



  return (
    <>
      <div id="homeBody" className="homeBody">
        <div className="left">
          <Sidebar />
        </div>

        <div className="right">
          <div className="dashboardContent">
            <div className="contentLeft">
              <div className="block1">
                <div className="fs-2">Welcome Back!</div>
                <div className="fs-4">{loggedInUser.FirstName}</div>
              </div>
              <div className="block2">
                <div className="fs-3">Total Employees: {empCounter}</div>
              </div>
            </div>

            <div className="d-inline">
              <div className="block3">
                <div className="title">Employee Distribution</div>
                <Doughnut data={data} options={options} />
              </div>
            </div>
            {/* <div className="d-inline">
              <div className="block4 d-inline">
                <div className="title">Salary Distribution</div>
                <Doughnut data={data} options={options} />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
