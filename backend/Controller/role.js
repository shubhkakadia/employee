const Role = require("../Model/role");
const Employee = require("../Model/employee");

const create = (req, res) => {
  let roleName = req.body.RoleName;
  let dailyWages = req.body.DailyWages;

  let newRole = Role({
    RoleName: roleName,
    DailyWages: dailyWages,
  });

  newRole
    .save()
    .then((data) => {
      Role.find()
        .then((remainingData) => {
          console.log("Create Role (Success)");
          const response = {
            status: "Success",
            response: remainingData,
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
  Role.find()
    .then((data) => {
      console.log("Read Role (Success)");
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

const updateRole = (req, res) => {
  Role.findOneAndUpdate(
    { RoleName: req.body.RoleName },
    { DailyWages: req.body.DailyWages }
  )
    .then((data) => {
      Role.find()
        .then((remainingData) => {
          console.log("Update Role (Success) ");
          const response = {
            status: "Success",
            response: remainingData,
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
    })
    .catch((err) => {
      const response = {
        status: "Error",
        response: err,
      };
      res.send(response);
    });
};

const deleteRole = (req, res) => {
  Employee.updateMany({ RoleName: req.body.RoleName }, { RoleName: "" })
    .then((data) => {
      console.log("Delete Users Role (Success)");
    })
    .catch((err) => {
      const response = {
        status: "Error",
        response: err,
      };
      res.send(response);
    });

  Role.findOneAndRemove({ RoleName: req.body.RoleName })
    .then((data) => {
      Role.find()
        .then((remainingData) => {
          console.log("Delete Role (Success) ");
          const response = {
            status: "Success",
            response: remainingData,
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
  updateRole,
  deleteRole,
};
