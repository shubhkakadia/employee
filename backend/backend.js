const express = require("express");
const employeeRouter = require("./Routes/employee");
const userRouter = require("./Routes/user");
const factoryRouter = require("./Routes/factory");
const app = express();
require("./db/conn");

app.use("/user", userRouter);
app.use("/employee", employeeRouter);
app.use("/factory", factoryRouter);

app.listen(5000, () => {
  console.log("Connected to PORT 5000...");
});
