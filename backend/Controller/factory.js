const Factory = require("../Model/factory");

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

const read = (req, res) => {
  Factory.find()
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

const readFactory = (req, res) => {
  Factory.findOne({ ID: req.params.id })
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

const deleteFactory = (req, res) => {
  Factory.findOneAndRemove({ ID: req.params.id })
    .then((data) => {
      Factory.find().then((remainingdata) => {
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
  readFactory,
  deleteFactory,
  update,
};
