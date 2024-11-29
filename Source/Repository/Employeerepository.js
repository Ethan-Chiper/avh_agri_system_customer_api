const EmployeeModel = require('../Models/EmployeeModel');
const Dotenv = require('dotenv');
Dotenv.config({ path: 'Source/.env.production' });
const { isEmpty } = require('../Helpers/Utils');

const EmployeeQuery = {
    /***
     * create employee
     * @param queryOptions
     * @returns {Promise<queryOptions>}
     */
    createEmployee: async (queryOptions) => {
        let document = queryOptions ?? {};
        let options = queryOptions ?? {};
        let employee = await EmployeeModel.create([document], options);
        return employee[0];
    },
    /**
     * find value
     * @param {*} condition
     * @param {*} projection
     * @param {*} useLean
     * @returns
     */
    findOneEmployee: async (condition, projection) => {
        if (isEmpty(projection)) projection = {};
        let EmployeeData = await EmployeeModel.findOne(condition, projection);
        return EmployeeData;
        // return await EmployeeModel.findOne(condition, projection);
    },
    /**
     * find employee
     * @param {*} condition
     * @param {*} projection
     * @param {*} islean
     * @returns
     */
    findEmployee: async (condition, projection, islean = true) => {
        let employee = await EmployeeModel.find(condition, projection).lean(islean);
        return employee;
    },
    /**
     * update employee
     * @param {*} condition
     * @param {*} projection
     * @returns
     */
    updateEmployee: async (condition, projection) => {
        if (isEmpty(projection)) projection = { new: true };
        return await EmployeeModel.findOneAndUpdate(condition, projection);
    },
    /**
     * delete value
     * @param {*} condition
     * @returns
     */
    deleteEmployee: async (condition) => {
        let options = condition || {};
        return await EmployeeModel.deleteOne(condition, options);
    }
};

module.exports = EmployeeQuery;
