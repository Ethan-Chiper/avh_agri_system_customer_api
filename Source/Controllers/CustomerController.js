const { createCustomer } = require('../Repository/Customerrepository');
const {  getNanoId, isEmpty } = require('../Helpers/Utils');
const { createUserAndTokenInKong } = require('../Helpers/KongUtils');

const CustomerController = {
    /**
     * create customer
     * @param {*} requestData
     * @returns
     */
    Create: async (requestData) => {
        try {
            if (isEmpty(requestData)) {
                return {
                    error: true,
                    message: 'Request data is not found',
                    data: undefined
                };
            }
            let requestObject = {
                customer_id: getNanoId(),
                customerName: requestData?.customerName,
                contactNumber: requestData?.contactNumber,
                address: {
                    line1: requestData?.address?.line1,
                    city: requestData?.address?.city,
                    state: requestData?.address?.state,
                    postalCode: requestData?.address?.postalCode
                },
                products: [
                    {
                        productId: requestData?.product_id,
                        productName: requestData?.productName,
                        quantity: requestData?.quantity,
                        price: requestData?.price
                    }
                ],
                transaction: {
                    totalAmount: requestData?.transaction?.totalAmount
                }
            };
            let customer = await createCustomer({ document: requestObject, options: { lean: false } });
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
            console.log('error', error);
            return {
                error: true,
                message: error.message,
                data: undefined
            };
        }
    }
};

module.exports = CustomerController;
