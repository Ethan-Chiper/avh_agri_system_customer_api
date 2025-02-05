// models/Employee.js
const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const employeeSchema = new mongoose.Schema({
    employee_id: { type: String },
    employee_name: { type: String },
    faceData: { type: Array, default: [] },
    email: { type: String, default: '' },
    is_active: { type: String, enum: ['active', 'deactive'], default: 'deactive' }
});
employeeSchema.plugin(timestamps);

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
