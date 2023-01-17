const User = require("../Model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
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
    Token: "",
  });

  bcrypt.hash(newUser.Password, 10, (err, hash) => {
    if (err) throw err;
    newUser.Password = hash;
    newUser
      .save()
      .then((data) => {
        console.log("Create User (Success)");
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
  });
};

const login = async (req, res) => {
  User.findOne({ Email: req.body.Email })
    .then((user) => {
      bcrypt
        .compare(req.body.Password, user.Password)
        .then((passwordCheck) => {
          if (!passwordCheck) {
            const response = {
              status: "Success",
              response: "Invalid Password",
              user: {},
            };
            return res.send(response);
          }

          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.Email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "365d" }
          );

          const query = async () => {
            await User.findOneAndUpdate(
              { Email: req.body.Email },
              {
                Token: token,
              }
            ).then((resp) => {
              return resp;
            });
          };
          query();
          user.Token = token;

          const response = {
            status: "Success",
            response: "Login Successful",
            user: user,
            token,
          };
          return res.send(response);
        })
        .catch((error) => {
          const response = {
            status: "Error",
            response: "Invalid Password",
            error,
            user: {},
          };
          return res.send(response);
        });
    })
    .catch((err) => {
      const response = {
        status: "Error",
        response: "Invalid Email",
        err,
        user: {},
      };
      return res.send(response);
    });
};

const freeContent = (req, res) => {
  res.send({ content: "free" });
};

const authorisedContent = (req, res) => {
  res.send({ content: "authorised" });
};

const read = (req, res) => {
  User.find()
    .then((data) => {
      console.log("Read User (Success)");
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
  User.findOne({ Email: req.params.email })
    .then((data) => {
      console.log("Read User by Email (Success)");
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
        console.log("Delete User (Success)");
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
        console.log("Update User (Success)");
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
  register,
  read,
  readEmail,
  deleteUser,
  update,
  login,
  freeContent,
  authorisedContent,
};
