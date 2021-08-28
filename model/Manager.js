const mongoose = require("mongoose");
// creating ManageraSchema
const ManagerSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			require: true,
			trim: true,
			unique: true,
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
		password: {
			type: String,
			require: true,
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
		company: {
			type: String,
			require: true,
			trim: true,
		},
	},
	{ timestamps: true }
);
// creating Manager Model
const Manager = new mongoose.model("manager", ManagerSchema);
// exporting the model
module.exports = Manager;
