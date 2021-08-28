const express = require("express");
const app = express();
var cors = require("cors");
// resolving the cors issues
app.use(cors());
// ncluding .env dependency
require("dotenv").config();
// incuding database connection
require("./model/DbConn");
const managerRoutes = require("./routes/ManagerRoutes");
const employeeRoutes = require("./routes/EmployeeRoutes");
//including manager route
app.use("/api", managerRoutes);
// including employee route
app.use("/api", employeeRoutes);
// defining the PORT
const port = 5000;
app.listen(port, () => console.log(`Example app listening on port port!`));
