const express = require("express");
const employeeRouter = require("./Routes/employee");
const userRouter = require("./Routes/user");
const factoryRouter = require("./Routes/factory");
const roleRouter = require("./Routes/role");
const attendanceRouter = require('./Routes/attendance');
const app = express();
const cors = require("cors");
require("./db/conn");

app.use(cors());
app.use("/user", userRouter);
app.use("/employee", employeeRouter);
app.use("/factory", factoryRouter);
app.use("/role", roleRouter);
app.use("/attendance", attendanceRouter);

app.listen(5000, () => {
  console.log("Connected to PORT 5000...");
});
