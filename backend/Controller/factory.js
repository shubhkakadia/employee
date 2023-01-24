const Factory = require("../Model/factory");
const Employee = require("../Model/employee");
const Attendance = require("../Model/attendance");

const create = (req, res) => {
  let ID = req.body.ID;
  let Name = req.body.Name;
  let Address = req.body.Address;
  let Photo = req.body.Photo;

  let newFactory = Factory({
    ID,
    Name,
    Address,
    Photo,
  });

  newFactory
    .save()
    .then((data) => {
      Factory.find().then((data) => {
        console.log("Create Factory (Success)");
        const response = {
          status: "Success",
          response: data,
        };
        res.send(response);
      });
    })
    .catch((err) => {
      const response = {
        status: "Error",
        response: err,
      };
      res.send(response);
    });
};

const read = (req, res) => {
  Factory.find()
    .then((data) => {
      console.log("Read Factory (Success) ");
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

const readFactory = (req, res) => {
  Factory.findOne({ Name: req.params.name })
    .then((data) => {
      console.log("Read Factory By Name (Success)");
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

function deleteFactory(req, res) {
  Attendance.deleteMany({ Factory: req.body.Name })
    .then((data) => {
      console.log("Data Deleted");
    })
    .catch((err) => {
      console.log("err", err);
    });
  Employee.deleteMany({ Factory: req.body.Name })
    .then((data) => {
      console.log("Data Deleted");
    })
    .catch((err) => {
      console.log("err", err);
    });

  Factory.findOneAndRemove({ ID: req.body.ID })
    .then((data) => {
      Factory.find().then((remainingdata) => {
        console.log("Remove Factory (Success)");
        const response = {
          status: "Success",
          response: remainingdata,
        };
        res.send(response);
      });
    })
    .catch((err) => {
      const response = {
        status: "Error",
        response: err,
      };
      res.send(response);
    });
}

const update = (req, res) => {
  Attendance.updateMany(
    { Factory: req.body.OldName },
    { Factory: req.body.Name }
  )
    .then((data) => {
      console.log("Employee Data Updated");
    })
    .catch((err) => {
      console.log("err", err);
    });
  Employee.updateMany({ Factory: req.body.OldName }, { Factory: req.body.Name })
    .then((data) => {
      console.log("Employee Data Updated");
    })
    .catch((err) => {
      console.log("err", err);
    });

  Factory.findOneAndUpdate(
    { ID: req.body.ID },
    {
      Name: req.body.Name,
      Address: req.body.Address,
      Photo: req.body.Photo,
    }
  )
    .then((data) => {
      Factory.find().then((remainingdata) => {
        console.log("Update Factory (Success)");
        const response = {
          status: "Success",
          response: remainingdata,
        };
        res.send(response);
      });
    })
    .catch((err) => {
      const response = {
        status: "Error",
        response: err,
      };
      res.send(response);
    });
};

const readAllFactoryEmployee = (req, res) => {
  let tempArr = [];
  Factory.find()
    .then((data) => {
      data.forEach(async (item) => {
        await Employee.find()
          .where({ Factory: item.Name })
          .then((data2) => {
            const factoryObj = {
              Factory: item,
              EmployeeArr: data2,
            };
            tempArr.push(factoryObj);
            if (item === data[data.length - 1]) {
              console.log("Read All Factory with employee (Success)");
              const response = {
                status: "Success",
                response: tempArr,
              };
              res.send(response);
            }
          })
          .catch((err) => {
            const response = {
              status: "Error",
              response: err,
            };
            res.send(response);
          });
      });
    })
    .catch((err) => {
      const response = {
        status: "Error",
        response: err,
      };
      res.send(response);
    });
};

module.exports = {
  create,
  read,
  readFactory,
  deleteFactory,
  update,
  readAllFactoryEmployee,
};
