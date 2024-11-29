const { createCustomer } = require('../Repository/Customerrepository');
const { todayDate, endDate, dateFinder, getNanoId, isEmpty } = require('../Helpers/Utils');
const SidebarModel = require('../Models/SidebarModel');
const {createUserAndTokenInKong,deleteUser} = require('../Helpers/KongUtils');

const ActivityController = {
    /**
     * create activity
     * @param {*} requestData
     * @returns
     */
    createActivity: async (requestObject) => {
        try {
            let uniqeID = 'customer_' + getNanoId();
            
            console.log(1, requestObject);
            if (isEmpty(requestObject)) {
                return {
                    error: true,
                    message: 'Request data is not found',
                    data: undefined
                }
            }
            let customer = await createCustomer({document:requestObject,options: {lean: false}});
            if (isEmpty(customer)) {
                return {
                    error: true,
                    message: 'Customer data is not saved properly',
                    data: undefined
                };
            }
            let customerId = 'customer' + '_' + customer?.customer_id;
            await createUserAndTokenInKong(customerId, (token) => {
                if (token)
                    console.log('token', token);
                return {error: false, message: 'consumer customer_id created successfully'};
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
    },
    // /**
    //  *list
    //  * @param {*} query
    //  * @param {*} activity_id
    //  * @returns
    //  */
    // list: async (query, activity_id) => {
    //     try {
    //         let queryObject = {};
    //         let limit = query?.limit ? Number.parseInt(query?.limit) : 10;
    //         let page = query?.page ? Number.parseInt(query?.page) : 1;
    //         if (query?.activity_id) queryObject['activity_id'] = query?.activity_id;
    //         if (query?.name) queryObject['name'] = query?.name;
    //         if (query?.from_date || query?.to_date || query.date_option) {
    //             queryObject['createdAt'] = dateFinder(query);
    //         }
    //         if (activity_id) {
    //             queryObject['activity_id'] = activity_id;
    //         }
    //         let activityData = await findActicity(queryObject);
    //         if (isEmpty(activityData)) {
    //             return {
    //                 error: true,
    //                 message: 'activity list is not found',
    //                 data: undefined
    //             };
    //         }
    //         return {
    //             error: false,
    //             message: 'Activity list',
    //             data: activityData
    //         };
    //     } catch (error) {
    //         return {
    //             error: error,
    //             message: 'Activity list is not available',
    //             data: undefined
    //         };
    //     }
    // },
    // /**
    //  * details
    //  * @param {*} queryData
    //  * @returns
    //  */
    // detail: async (queryData) => {
    //     console.log(queryData);
    //     if (isEmpty(queryData)) {
    //         return {
    //             error: true,
    //             message: 'activity_id is not empty',
    //             data: undefined
    //         };
    //     }
    //     let result = await findOneActivity({ activity_id: queryData });
    //     console.log('result', result);
    //     try {
    //         if (isEmpty(result)) {
    //             return {
    //                 error: true,
    //                 message: 'activity details is not found',
    //                 data: undefined
    //             };
    //         } else {
    //             return {
    //                 error: false,
    //                 message: 'Activity details are.',
    //                 data: result
    //             };
    //         }
    //     } catch (error) {
    //         return {
    //             error: true,
    //             message: error.message
    //         };
    //     }
    // },
    // /**
    //  * update activity
    //  * @param { } requestData
    //  * @returns
    //  */
    // update: async (requestData) => {
    //     try {
    //         if (isEmpty(requestData)) {
    //             return {
    //                 error: true,
    //                 message: 'activity data is not empty',
    //                 data: undefined
    //             };
    //         }
    //         if (!requestData?.title || !requestData?.description || !requestData?.index) {
    //             return {
    //                 Status: 'Failed',
    //                 message: 'Title, description, and index are required fields',
    //                 data: {}
    //             };
    //         } else {
    //             const activity = await findOneActivity({
    //                 activity_id: requestData?.activity_id
    //             });
    //             if (isEmpty(activity)) {
    //                 return {
    //                     error: true,
    //                     message: 'activity data is not found',
    //                     data: undefined
    //                 };
    //             }
    //             let requestObject = {
    //                 activity_id: requestData?.activity_id ?? activity?.activity_id,
    //                 title: requestData?.title ?? activity?.title,
    //                 description: requestData?.description ?? activity?.description,
    //                 index: requestData?.index ?? activity?.index
    //             };
    //             let UpateResult = await updateActivity(requestObject);
    //             if (!isEmpty(UpateResult)) {
    //                 return {
    //                     error: false,
    //                     message: 'activity updated successful',
    //                     data: UpateResult
    //                 };
    //             } else {
    //                 return {
    //                     error: true,
    //                     message: 'activity is not updated',
    //                     data: undefined
    //                 };
    //             }
    //         }
    //     } catch (error) {
    //         return {
    //             error: true,
    //             message: error.message
    //         };
    //     }
    // },
    // /**
    //  * delete activity
    //  * @param {*} activity_id
    //  * @returns
    //  */
    // deleteActivity: async (activity_id) => {
    //     console.log(activity_id);
    //     console.log(1234);
    //     try {
    //         if (isEmpty(activity_id)) {
    //             return { error: true, message: 'Unauthorized access.' };
    //         }
    //         let activity = await findActicity({ activity_id: activity_id });
    //         if (isEmpty(activity)) {
    //             return { error: false, message: 'Invalid Activity!' };
    //         } else {
    //             let activity = await findActicity({ activity_id: activity_id });
    //             let deleteProduct = await deleteActivity({
    //                 activity_id: activity?.activity_id
    //             });
    //             if (deleteProduct) {
    //                 return {
    //                     error: false,
    //                     data: {},
    //                     message: 'Product deleted successfully!'
    //                 };
    //             }
    //             return { error: false, data: {}, message: 'Something went wrong!' };
    //         }
    //     } catch (error) {}
    // }
};

module.exports = ActivityController;
