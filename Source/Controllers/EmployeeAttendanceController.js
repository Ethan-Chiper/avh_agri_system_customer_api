/* eslint-disable no-unused-vars */
const Express = require('express');
const Router = Express.Router();
const bodyParser = require('body-parser');
Router.use(bodyParser.urlencoded({ extended: false }));
Router.use(bodyParser.json());
const moment = require('moment');
const { VerifyToken } = require('../Helpers/JWSToken');
const { isEmpty, todayDate, findCurrentDate, getNanoId } = require('../Helpers/Utils');
const EmployeeAttendanceModel = require('../Models/EmployeeAttendanceModel');
const EmployeeModel = require('../Models/EmployeeModel');

Router.post('/create', async (request, response) => {
    try {
        let requestData = request?.body;
        if (!requestData?.employee_id) {
            return response.send({
                error: true,
                message: 'employee_id is not empty',
                data: {}
            });
        }
        let Employee = await EmployeeModel.findOne({ employee_id: requestData?.employee_id }).lean();
        if (isEmpty(Employee)) {
            return response.send({
                error: true,
                message: 'Employee details is not found',
                data: {}
            });
        }
        let startOfDay = new Date(todayDate());
        let endOfDay = new Date(todayDate());
        endOfDay.setHours(23, 59, 59, 999);
        let requestObject = {
            employee_id: requestData?.employee_id,
            createdAt: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        };
        let getAttendance = await EmployeeAttendanceModel.findOne(requestObject);
        if (!isEmpty(getAttendance)) {
            return response.send({
                error: true,
                message: 'Attendance for today is already logged',
                data: {}
            });
        }
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const currentTime = `${hours}:${minutes}:${seconds}`;
        requestData.checkInTime = currentTime;
        let requestValue = {
            emp_attendance_id: getNanoId(),
            employee_id: Employee?.employee_id,
            userName: Employee?.userName,
            checkInTime: currentTime,
            checkOutTime: Employee?.checkOutTime ?? ''
        };
        const record = await EmployeeAttendanceModel.create(requestValue);

        return response.send({
            error: false,
            message: 'Attendance submitted successfully',
            data: record
        });
    } catch (error) {
        return response.send({
            error: true,
            message: error.message,
            dat: {}
        });
    }
});

// update a new activity
Router.patch('/update', async (request, response) => {
    try {
        let requestData = request?.body;
        if (!requestData?.employee_id) {
            return response.send({
                error: true,
                message: 'employee_id is not empty',
                data: {}
            });
        }
        let getEmployeeAttendance = await EmployeeAttendanceModel.findOne({ employee_id: requestData?.employee_id });
        if (isEmpty(getEmployeeAttendance)) {
            return response.send({
                error: true,
                message: 'EmployeeAttendance is not found',
                data: {}
            });
        }
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const currentTime = `${hours}:${minutes}:${seconds}`;

        getEmployeeAttendance.checkOutTime = currentTime;
        getEmployeeAttendance.markModified(['checkOutTime']);
        let result = await getEmployeeAttendance.save();
        return response.send({
            error: false,
            message: 'Logout successfully',
            data: {}
        });
    } catch (error) {
        return response.send({
            error: true,
            message: error.message,
            data: {}
        });
    }
});

module.exports = Router;
