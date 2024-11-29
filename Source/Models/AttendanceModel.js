const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const EmployeeAttendanceSchema = new mongoose.Schema({
    emp_attendance_id: { type: String },
    employee_id: { type: String },
    userName: {
        type: String
    },
    checkInTime: {
        type: String,
        default: ''
    },
    checkOutTime: {
        type: String,
        default: ''
    }
});
EmployeeAttendanceSchema.plugin(timestamps);
const EmployeeAttendance = mongoose.model('EmployeeAttendance', EmployeeAttendanceSchema);

module.exports = EmployeeAttendance;
