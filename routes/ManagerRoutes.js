const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
const allMiddleware = require("../middleware/AllMiddleware");
const { check, validationResult } = require("express-validator");
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

const managerController = require("../controllers/ManagerController");
// route for manager registration
router.post(
	"/register",
	[
		check("firstname", "please enter minimum 2 character for name").isLength({
			min: 2,
		}),
		check("email", "please enter a valid email").isEmail(),
		check("password", "please enter minimum 5 character for password").isLength(
			{ min: 5 }
		),
		check("company", "please enter minimum 2 character for company").isLength({
			min: 2,
		}),
	],
	managerController.signup
);
// route for Manager login
router.post(
	"/login",
	[
		check("email", "please enter a valid email").isEmail(),
		check("password", "password should not be empty").notEmpty(),
	],
	managerController.login
);
// route for manager signout
router.get("/signout", managerController.signout);
module.exports = router;
