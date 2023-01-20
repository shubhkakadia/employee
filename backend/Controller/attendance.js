const Attendance = require("../Model/attendance");

const create = (req, res) => {
  // Create new entry every day.
  let Date = req.body.date;
  let EmployeeList = req.body.EmployeeList;

  const newAttendance = Attendance({
    Date,
    EmployeeList,
  });

  newAttendance
    .save()
    .then((data) => {
      console.log("Create Attendance (Success)");
      const response = {
        status: "Success",
        response: data,
      };
      res.send(response);
    })
    .catch((err) => {
      const response = {
        status: "Error",
        response: err,
      };
      res.send(response);
    });
};

const get = (req, res) => {
  // Fetch All Data.
  Attendance.find()
    .then((data) => {
      console.log("Read Attendance (Success) ");
      const response = {
        status: "Success",
        response: data,
      };
      res.send(response);
    })
    .catch((err) => {
      const response = {
        status: "Error",
        response: err,
      };
      res.send(response);
    });
};

const getDate = (req, res) => {
  // Fetch Data of Date from Body/Params.
  // Req: Date, Month, Year

  Attendance.findOne({ Date: new Date(req.body.date) })
    .then((data) => {
      console.log("Read Attendance By Date (Success)");
      const response = {
        status: "Success",
        response: data,
      };
      res.send(response);
    })
    .catch((err) => {
      const response = {
        status: "Error",
        response: err,
      };
      res.send(response);
    });
};

const getMonth = (req, res) => {
  // Fetch Data of Whole Month from Body/Params.
  // Req: Month, Year
  const startDate = new Date(`${req.body.year}-${req.body.month}-01`);
  const endDate = new Date(`${req.body.year}-${req.body.month}-31`);

  Attendance.find({
    Date: {
      $gte: startDate,
      $lte: endDate,
    },
  })
    .then((data) => {
      console.log("Read Attendance By Month (Success)");
      const response = {
        status: "Success",
        response: data,
      };
      res.send(response);
    })
    .catch((err) => {
      const response = {
        status: "Error",
        response: err,
      };
      res.send(response);
    });
};

const getYear = (req, res) => {
  // Fetch Data of Whole Year from Body/Params.
  // Req: Year
  const startDate = new Date(`${req.body.year}-01-01`);
  const endDate = new Date(`${req.body.year}-12-31`);

  console.log("startDate", startDate);
  console.log("endDate", endDate);

  Attendance.find({
    Date: {
      $gte: startDate,
      $lte: endDate,
    },
  })
    .then((data) => {
      console.log("Read Attendance By Year (Success)");
      const response = {
        status: "Success",
        response: data,
      };
      res.send(response);
    })
    .catch((err) => {
      const response = {
        status: "Error",
        response: err,
      };
      res.send(response);
    });
};

const getEmployeeData = async (req, res) => {
  console.log("first");
  // Fetch All Attendance Data of Employee from Body/Params.
  // Req: Employee ID
  let dateArr = [];
  console.log("ID", req.body.ID);
  await Attendance.find()
    .then((data) => {
      console.log("data", data);
      data.forEach((item) => {
        console.log("date", item.Date);
        if (item.EmployeeList.includes(req.body.ID)) {
          dateArr.push(item.Date);
        }
      });
    })
    .catch((err) => {
      const response = {
        status: "Error",
        response: err,
      };
      res.send(response);
    });

  // console.log("Read All Dates with employee ID (Success)");

  const response = {
    status: "Success",
    response: dateArr,
  };
  await res.send(response);
  console.log("sent")
};

const addEmployeeDate = async (req, res) => {
  // Update Data by Date.
  // Req: EmployeeID, DateArr.

  await req.body.DateArr.forEach((date) => {
    Attendance.findOne({ Date: new Date(date) }).then((data) => {
      if (!data) {
        let Date = date;
        let EmployeeList = [req.body.ID];

        const newAttendance = Attendance({
          Date,
          EmployeeList,
        });
        newAttendance
          .save()
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            const response = {
              status: "Error",
              response: err,
            };
            res.send(response);
          });
      } else {
        console.log("date", data);
        if (!data.EmployeeList.includes(req.body.ID)) {
          data
            .updateOne({ EmployeeList: [...data.EmployeeList, req.body.ID] })
            .then((data) => {
              console.log("Added Data");
            })
            .catch((err) => {
              const response = {
                status: "Error",
                response: err,
              };
              res.send(response);
            });
        }
      }
    });
  });

  const response = {
    status: "Success",
  };
  await res.send(response);

  // getEmployeeData(req, res);
};

const removeEmployeeDate = async (req, res) => {

  req.body.DateArr.forEach((date) => {
    Attendance.findOne({ Date: new Date(date) }).then((data) => {
      console.log("data", data);
      function updatedEmployeeList() {
        const updateEmployeeList = data.EmployeeList;
        const index = updateEmployeeList.indexOf(req.body.ID);
        if (index > -1) {
          updateEmployeeList.splice(index, 1);
        }
        return updateEmployeeList;
      }

      data
        .updateOne({ EmployeeList: updatedEmployeeList() })
        .then((data2) => {
          console.log("Removed Data");
        })
        .catch((err) => {
          const response = {
            status: "Error",
            response: err,
          };
          res.send(response);
        });
    });
  });

  const response = {
    status: "Success",
  };
  await res.send(response);

  // getEmployeeData(req, res);
};

module.exports = {
  create,
  get,
  getDate,
  getMonth,
  getYear,
  getEmployeeData,
  addEmployeeDate,
  removeEmployeeDate,
};
