const CustomerModel = require('../Models/CustomerModel');
const Dotenv = require('dotenv');
Dotenv.config({ path: 'Source/.env.production' });
const { isEmpty } = require('../Helpers/Utils');

const CustomerQuery = {
    /***
     * create customer
     * @param queryOptions
     * @returns {Promise<queryOptions>}
     */
    createCustomer: async (queryOptions) => {
        let document = queryOptions?.document ?? {};
        let options = queryOptions?.options ?? {};
        let activity = await CustomerModel.create([document], options);
        return activity[0];
    },
    /**
     * find value
     * @param {*} condition
     * @param {*} projection
     * @param {*} useLean
     * @returns
     */
    findOneCustomer: async (condition, projection) => {
        if (isEmpty(projection)) projection = {};
        let ActivityData = await CustomerModel.findOne(condition, projection);
        return ActivityData;
        // return await CustomerModel.findOne(condition, projection);
    },
    /**
     * find customer
     * @param {*} condition
     * @param {*} projection
     * @param {*} islean
     * @returns
     */
    findCustomer: async (condition, projection, islean = true) => {
        let customer = await CustomerModel.find(condition, projection).lean(islean);
        return customer;
    },
    /**
     * update customer
     * @param {*} condition
     * @param {*} projection
     * @returns
     */
    updateCustomer: async (condition, projection) => {
        if (isEmpty(projection)) projection = { new: true };
        return await CustomerModel.findOneAndUpdate(condition, projection);
    },
    /**
     * delete value
     * @param {*} condition
     * @returns
     */
    deleteCustomer: async (condition) => {
        let options = condition || {};
        return await CustomerModel.deleteOne(condition, options);
    }
};

module.exports = CustomerQuery;
