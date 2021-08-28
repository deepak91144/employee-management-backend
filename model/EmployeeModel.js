const mongoose = require("mongoose");
// creating employeemodel schema
const employeeModelSchema = new mongoose.Schema(
	{
		empId: {
			type: String,
			required: true,
		},
		firstname: {
			type: String,
			require: true,
			trim: true,
		},
		lastname: {
			type: String,
			trim: true,
		},

		address: {
			type: String,
			trim: true,
		},
		dob: {
			type: String,
			trim: true,
		},
		mobile: {
			type: Number,
			trim: true,
		},
		city: {
			type: String,
			trim: true,
		},
	},
	{ timestamps: true }
);
// creating emmployee model
const EmployeeModel = new mongoose.model("EmployeeModel", employeeModelSchema);
// exporting the model
module.exports = EmployeeModel;
