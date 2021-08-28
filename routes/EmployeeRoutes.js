const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
const allMiddleware = require("../middleware/AllMiddleware");
const employeeController = require("../controllers/EmployeeController");
const { check, validationResult } = require("express-validator");

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());
// this routes calls a middleware  that runs for every routes which having ManagerId as parameter
router.param("managerId", allMiddleware.getManagerById);
// route for create new employee
router.post(
	"/employee/add/:managerId",
	[
		check(
			"firstname",
			"please enter minimum 2 character for first name"
		).isLength({
			min: 2,
		}),

		check("address", "address shouldnot be empty").notEmpty(),

		check("mobile", "number should be numeric ").isNumeric(),
	],
	allMiddleware.isSignedIn,
	allMiddleware.isAuthenticated,
	employeeController.addEmployee
);
// route for getting all employees
router.get(
	"/employee/:managerId",
	allMiddleware.isSignedIn,
	allMiddleware.isAuthenticated,
	employeeController.getAllEmployee
);
// route for delete a employee
router.delete(
	"/employee/delete/:employeeId/:managerId",
	allMiddleware.isSignedIn,
	allMiddleware.isAuthenticated,
	employeeController.deleteEmployee
);
// route for get a specific employee
router.get(
	"/employee/:employeeId/:managerId",
	allMiddleware.isSignedIn,
	allMiddleware.isAuthenticated,
	employeeController.getAnEmployee
);
// route for update an employee
router.put(
	"/employee/update/:employeeId/:managerId",
	allMiddleware.isSignedIn,
	allMiddleware.isAuthenticated,
	employeeController.updateEmployee
);

module.exports = router;
