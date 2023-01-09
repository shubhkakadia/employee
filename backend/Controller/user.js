const User = require("../Model/user");
const bcrypt = require("bcryptjs");

const create = (req, res) => {
  let Email = req.body.Email;
  let FirstName = req.body.FirstName;
  let LastName = req.body.LastName;
  let Photo = req.body.Photo;
  let Password = req.body.Password;

  let newUser = User({
    Email,
    FirstName,
    LastName,
    Photo,
    Password,
  });

  bcrypt.genSalt(10, (err, salt) =>
    bcrypt.hash(newUser.Password, salt, (err, hash) => {
      if (err) throw err;
      newUser.Password = hash;
      newUser
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
    })
  );
};

const read = (req, res) => {
  User.find()
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

const readEmail = (req, res) => {
  User.findOne({ Email: req.body.Email })
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

const deleteUser = (req, res) => {
  User.findOneAndRemove({ Email: req.body.Email })
    .then((data) => {
      User.find().then((remainingdata) => {
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
  function genPass(pass) {
    var hashedPass = "";
    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(pass, salt, (err, hash) => {
        if (err) throw err;
        hashedPass = hash;
      })
    );
    return hashedPass;
  }

  User.findOneAndUpdate(
    { Email: req.body.Email },
    {
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Photo: req.body.Photo,
      Password: genPass(req.body.Password),
    }
  )
    .then((data) => {
      User.find().then((remainingdata) => {
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
  readEmail,
  deleteUser,
  update,
};
