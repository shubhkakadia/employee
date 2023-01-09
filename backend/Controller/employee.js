const Emp = require("../Model/employee");

const create = (req, res) => {
  let ID = req.body.ID;
  let FirstName = req.body.FirstName;
  let LastName = req.body.LastName;
  let PhoneNo = req.body.PhoneNo;
  let DoB = req.body.DoB;
  let AdhaarNo = req.body.AdhaarNo;
  let Reference = req.body.Reference;
  let Address = req.body.Address;
  let Village = req.body.Village;
  let VillageAddress = req.body.VillageAddress;
  let JoinDate = req.body.JoinDate;
  let LeaveDate = req.body.LeaveDate;
  let Photo = req.body.Photo;
  let StillWorking = req.body.StillWorking;
  let BankName = req.body.BankName;
  let IFSC = req.body.IFSC;
  let AccountNo = req.body.AccountNo;
  let Note = req.body.Note;
  let emp = new Emp({
    ID,
    FirstName,
    LastName,
    PhoneNo,
    DoB,
    AdhaarNo,
    Reference,
    Address,
    Village,
    VillageAddress,
    JoinDate,
    LeaveDate,
    Photo,
    StillWorking,
    BankName,
    IFSC,
    AccountNo,
    Note,
  });

  emp
    .save()
    .then((data) => {
      Emp.find().then((remainingdata) => {
        console.log("Success: ");
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

const read = (req, res) => {
  Emp.find()
    .then((data) => {
      console.log("Success: ");
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

const readID = (req, res) => {
  Emp.findOne({ ID: req.params.id })
    .then((data) => {
      console.log("Success: ");
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

const deleteEmp = (req, res) => {
  Emp.findOneAndRemove({ ID: req.params.id })
    .then((data) => {
      Emp.find().then((remainingdata) => {
        console.log("Success: ");
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

const update = (req, res) => {
  Emp.findOneAndUpdate(
    { ID: req.body.ID },
    {
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      PhoneNo: req.body.PhoneNo,
      DoB: req.body.DoB,
      AdhaarNo: req.body.AdhaarNo,
      Reference: req.body.Reference,
      Address: req.body.Address,
      Village: req.body.Village,
      VillageAddress: req.body.VillageAddress,
      JoinDate: req.body.JoinDate,
      LeaveDate: req.body.LeaveDate,
      Photo: req.body.Photo,
      StillWorking: req.body.StillWorking,
      BankName: req.body.BankName,
      IFSC: req.body.IFSC,
      AccountNo: req.body.AccountNo,
      Note: req.body.Note,
    }
  )
    .then((data) => {
      Emp.find().then((remainingdata) => {
        console.log("Success: ");
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

module.exports = {
  create,
  read,
  readID,
  deleteEmp,
  update,
};
