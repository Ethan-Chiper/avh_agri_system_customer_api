const Express = require('express');
const Router = Express.Router();
const bodyParser = require('body-parser');
Router.use(bodyParser.urlencoded({ extended: false }));
Router.use(bodyParser.json());
const moment = require('moment');
const { VerifyToken } = require('../Helpers/JWSToken');
const { recognizeFace, generateFaceEncoding } = require('../Helpers/faceAuth');
const { isEmpty, todayDate, findCurrentDate } = require('../Helpers/Utils');
const Attendance = require('../Models/AttendanceModel');
const EmployeeModel = require('../Models/EmployeeModel');
const multer = require('multer');
const path = require('path');
const Dotenv = require('dotenv');
Dotenv.config({ path: 'Source/.env.production' });
const environment = process.env;
const axios = require('axios');

const AttendanceController = {};
module.exports = AttendanceController;