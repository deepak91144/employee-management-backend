const managerModel = require("../model/Manager");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
var cookieParser = require("cookie-parser");

// function for manager signup
exports.signup = async (req, res) => {
	try {
		// checking if any validation error exist
		const errors = validationResult(req);
		// convert errors into array for better readability
		const err = errors.array().map((data, index) => {
			return data.msg;
		});
		// sending the json response for validation errors
		if (!errors.isEmpty()) {
			return res.status(400).json({ status: "validation error", error: err });
		}
		// getting manager details from frontend
		const managerDetails = req.body;
		//checking email exist before or not
		const { email } = managerDetails;
		const userExist = await managerModel.findOne({ email: email });
		// send json response for email exist before error
		if (userExist) {
			return res.status(400).json({
				status: "email exist",
				message: "email already exist",
			});
		}
		// convert the plain password into ecrypted format
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		managerDetails.password = hashedPassword;
		// creating manager model object
		const manager = new managerModel(managerDetails);
		// signup manager details
		const newManager = await manager.save();
		// return res.json(newManager);
		if (newManager) {
			// creating token by jwt
			const token = jwt.sign({ _id: newManager._id }, process.env.SECRET);
			// store the token into brower cookie
			res.cookie("token", token, { expire: new Date() + 9999 });
			newManager.status = undefined;
			newManager.message = undefined;
			// sending the json response after successfully signup
			return res.status(201).json({
				status: "ok",
				message: "New Manager created",
				token: token,
				user: newManager,
			});
		}
		// sending the error response if something goes wrong
		else {
			return res.status(400).json({
				status: "error",
				message: "something went wrong,try again later",
			});
		}
	} catch (error) {
		// sending the error response if something goes wrong
		res.json(error);
	}
};
exports.login = async (req, res) => {
	try {
		// checking if any validation error exist
		const errors = validationResult(req);
		// convert errors into array for better readability
		const err = errors.array().map((data, index) => {
			return data.msg;
		});
		// sending the json response for validation errors
		if (!errors.isEmpty()) {
			return res.status(400).json({ status: "validation error", error: err });
		}
		// destructing email and password that come from frontend
		const { email, password } = req.body;
		// checking that manager exist or not by enail
		const userExist = await managerModel.findOne({ email: email });
		if (userExist) {
			// checking for password match
			const ispasswordMatched = await bcrypt.compare(
				password,
				userExist.password
			);
			// if password matched
			if (ispasswordMatched) {
				userExist.password = undefined;
				// creating token by jwt
				const token = jwt.sign({ _id: userExist._id }, process.env.SECRET);
				// store the token into brower cookie
				res.cookie("token", token, { expire: new Date() + 9999 });
				// sending the json reponse for successfully login
				return res.status(201).json({
					status: "ok",
					token: token,
					user: userExist,
				});
			}
			// sending error json response if email and password doeant match
			else {
				return res.status(400).json({
					status: "wrong pair",
					message: "wrong email and password pair",
				});
			}
		}
		// sending error json response if email and password doeant match
		else {
			return res.status(400).json({
				status: "wrong pair",
				message: "wrong email and password pair",
			});
		}
	} catch (error) {
		// sending json response if something went wrong
		return res.status(400).json({
			status: "something went wrong",
			message: "try again later",
		});
	}
};
// function for signput
exports.signout = (req, res) => {
	// clearing cookie from client brower
	res.clearCookie("token");
	// sending response of signout
	res.status(201).json({
		message: "signed out successfully",
	});
};
