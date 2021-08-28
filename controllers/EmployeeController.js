const employeeModel = require("../model/EmployeeModel");
const { check, validationResult } = require("express-validator");
var uuid = require("uuid");
// function to add employee
exports.addEmployee = async (req, res) => {
	try {
		// fetching arror from express-validator if anyexist
		const errors = validationResult(req);

		// convert error object into array for better readability
		const err = errors.array().map((data, index) => {
			return data.msg;
		});
		// sending json response of errors
		if (!errors.isEmpty()) {
			return res.status(400).json({ status: "validation error", error: err });
		}
		// getting employee details from frontend
		const employeeDetails = req.body;
		employeeDetails.empId = uuid.v4();
		// creating object of employee model
		const employee = new employeeModel(employeeDetails);
		// finally saving employee details to db
		const newEmployee = await employee.save();
		// if new employee is created successfully send the json response back to frontend
		if (newEmployee) {
			return res.status(201).json({
				status: "ok",
				message: "NewEmployee created successfully",
				employee: newEmployee,
			});
		}
		// else return the error response
		else {
			return res.status(401).json({
				message: "something went wrong, try again later",
			});
		}
	} catch (error) {
		return res.status(401).json({
			message: error,
		});
	}
};
// function to delete employee
exports.deleteEmployee = async (req, res) => {
	try {
		// get employeeId from query parameter
		const employeeId = req.params.employeeId;

		// delete employee from db
		const deletedemployee = await employeeModel.findOneAndDelete({
			_id: employeeId,
		});
		// if employee succssfully deleted send a json request accordingly
		if (deletedemployee) {
			return res.status(203).json({
				message: "employee deleted successfully",
				deletedemployee: deletedemployee,
			});
		}
		// if something went wrong send json response accordingly
		else {
			return res.status(203).json({
				message: "something went wrong try again later",
			});
		}
	} catch (error) {
		// if some thing went wrong caatch block runs
		return res.status(203).json({
			message: "something went wrong try again later",
		});
	}
};
exports.updateEmployee = async (req, res) => {
	try {
		// geeting the empid from parameter
		const employeeId = req.params.employeeId;
		// geting employee details from frontend
		const employeeDetails = req.body;
		// updating the employee details into db
		const updatedEmployee = await employeeModel.findOneAndUpdate(
			{
				_id: employeeId,
			},
			employeeDetails,
			{ new: true }
		);
		// sending the json response to frontend after successfully updation
		res.json({
			status: "ok",
			message: "employee updated successfully",
			data: updatedEmployee,
		});
	} catch (error) {
		// sending the error after something went wrong
		res.json({
			message: "something went wrong",
		});
	}
};

// fetching all employee data
exports.getAllEmployee = async (req, res) => {
	try {
		// getting all the employee from db
		const employee = await employeeModel.find();
		// if data fetched successfully send json response
		if (employee) {
			return res.status(200).json({
				message: "fetched successfully",
				employee: employee,
			});
		}
		// if something went wrong send json response accordingly
		else {
			return res.status(401).json({
				message: "something went wrong try again late",
			});
		}
	} catch (error) {
		// if some thing went wrong caatch block runs
		return res.status(401).json({
			message: "something went wrong try again late",
		});
	}
};

// getting a specific employee

exports.getAnEmployee = async (req, res) => {
	try {
		const employeeId = req.params.employeeId;
		// getting all the employee from db
		const employee = await employeeModel.findOne({ _id: employeeId });
		// if data fetched successfully send json response
		if (employee) {
			return res.status(200).json({
				message: "fetched successfully",
				employee: employee,
			});
		}
		// if something went wrong send json response accordingly
		else {
			return res.status(401).json({
				message: "something went wrong try again late",
			});
		}
	} catch (error) {
		// if some thing went wrong caatch block runs
		return res.status(401).json({
			message: "something went wrong try again late",
		});
	}
};
