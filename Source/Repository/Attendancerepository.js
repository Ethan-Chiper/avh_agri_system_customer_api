const AttendanceModel = require('../Models/AttendanceModel');
const Dotenv = require('dotenv');
Dotenv.config({ path: 'Source/.env.production' });
const { isEmpty } = require('../Helpers/Utils');

const AttendanceQuery = {
    /***
     * create attendance
     * @param queryOptions
     * @returns {Promise<queryOptions>}
     */
    createAttendance: async (queryOptions) => {
        let document = queryOptions ?? {};
        let options = queryOptions ?? {};
        let attendance = await AttendanceModel.create([document], options);
        return attendance[0];
    },
    /**
     * find value
     * @param {*} condition
     * @param {*} projection
     * @param {*} useLean
     * @returns
     */
    findOneAttendance: async (condition, projection) => {
        if (isEmpty(projection)) projection = {};
        let AttendanceData = await AttendanceModel.findOne(condition, projection);
        return AttendanceData;
        // return await AttendanceModel.findOne(condition, projection);
    },
    /**
     * find attendance
     * @param {*} condition
     * @param {*} projection
     * @param {*} islean
     * @returns
     */
    findAttendance: async (condition, projection, islean = true) => {
        let attendance = await AttendanceModel.find(condition, projection).lean(islean);
        return attendance;
    },
    /**
     * update attendance
     * @param {*} condition
     * @param {*} projection
     * @returns
     */
    updateAttendance: async (condition, projection) => {
        if (isEmpty(projection)) projection = { new: true };
        return await AttendanceModel.findOneAndUpdate(condition, projection);
    },
    /**
     * delete value
     * @param {*} condition
     * @returns
     */
    deleteAttendance: async (condition) => {
        let options = condition || {};
        return await AttendanceModel.deleteOne(condition, options);
    }
};

module.exports = AttendanceQuery;
