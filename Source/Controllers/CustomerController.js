const { createCustomer } = require('../Repository/Customerrepository');
const { todayDate, endDate, dateFinder, getNanoId, isEmpty } = require('../Helpers/Utils');
const { createUserAndTokenInKong, deleteUser } = require('../Helpers/KongUtils');

const CustomerController = {
    /**
     * create customer
     * @param {*} requestData
     * @returns
     */
    Create: async (requestObject) => {
        try {
            let uniqeID = 'customer_' + getNanoId();
            if (isEmpty(requestObject)) {
                return {
                    error: true,
                    message: 'Request data is not found',
                    data: undefined
                };
            }
            let customer = await createCustomer({ document: uniqeID, options: { lean: false } });
            if (isEmpty(customer)) {
                return {
                    error: true,
                    message: 'Customer data is not saved properly',
                    data: undefined
                };
            }
            let customerId = 'customer' + '_' + customer?.customer_id;
            await createUserAndTokenInKong(customerId, (token) => {
                if (token) console.log('token', token);
                return { error: false, message: 'consumer customer_id created successfully' };
            });
            return {
                error: false,
                message: 'customer created successfully',
                data: customer
            };
        } catch (error) {
            return {
                error: true,
                message: error,
                data: undefined
            };
        }
    }
};

module.exports = CustomerController;
