const { createEmployee, findEmployee, findOneEmployee, updateEmployee } = require('../Repository/Employeerepository');
const { isEmpty, getNanoId, dateFinder } = require('../Helpers/Utils');

const EmployeeController = {
    /**
     * create employee
     * @returns
     */
    Create: async (requestData) => {
        try {
            if (!requestData?.userName) {
                return {
                    error: true,
                    message: 'userName fields are required',
                    data: {}
                };
            }
            let requestObject = {
                employee_id: getNanoId(),
                employee_Name: requestData?.userName
            };

            let Employee = await createEmployee(requestObject);

            if (isEmpty(Employee)) {
                return {
                    error: true,
                    message: 'Employee is not created',
                    data: {}
                };
            }
            return {
                error: false,
                message: 'Employee created successfully',
                data: Employee
            };
        } catch (error) {
            return {
                error: true,
                message: error.message,
                data: {}
            };
        }
    },
    /**
     * List
     * @param {*} query
     * @param {*} employee_id
     * @returns
     */
    List: async (query, employee_id) => {
        try {
            let queryObject = {};
            // let limit = query?.limit ? Number.parseInt(query?.limit) : 10;
            // let page = query?.page ? Number.parseInt(query?.page) : 1;
            if (query?.employee_id) queryObject['employee_id'] = query?.employee_id;
            if (query?.name) queryObject['name'] = query?.name;
            if (query?.from_date || query?.to_date || query.date_option) {
                queryObject['createdAt'] = dateFinder(query);
            }
            if (employee_id) {
                queryObject['employee_id'] = employee_id;
            }
            let employeeData = await findEmployee(queryObject);
            if (isEmpty(employeeData)) {
                return {
                    error: true,
                    message: 'Employee list is not found',
                    data: undefined
                };
            }
            return {
                error: false,
                message: 'Employee list',
                data: employeeData
            };
        } catch (error) {
            return {
                error: error,
                message: 'Employee list is not available',
                data: undefined
            };
        }
    },
    /**
     * get details
     * @param {*} queryData
     * @returns
     */
    Details: async (queryData) => {
        if (isEmpty(queryData)) {
            return {
                error: true,
                message: 'employee_id is not empty',
                data: undefined
            };
        }
        let result = await findOneEmployee({ employee_id: queryData });
        try {
            if (isEmpty(result)) {
                return {
                    error: true,
                    message: 'Employee details is not found',
                    data: undefined
                };
            } else {
                return {
                    error: false,
                    message: 'Employee details are.',
                    data: result
                };
            }
        } catch (error) {
            return {
                error: true,
                message: error.message,
                data: {}
            };
        }
    },
    update: async (requestData) => {
        try {
            if (isEmpty(requestData)) {
                return {
                    error: true,
                    message: 'activity data is not empty',
                    data: undefined
                };
            }
            if (!requestData?.title || !requestData?.description || !requestData?.index) {
                return {
                    Status: 'Failed',
                    message: 'Title, description, and index are required fields',
                    data: {}
                };
            } else {
                const activity = await findOneActivity({
                    activity_id: requestData?.activity_id
                });
                if (isEmpty(activity)) {
                    return {
                        error: true,
                        message: 'activity data is not found',
                        data: undefined
                    };
                }
                let requestObject = {
                    activity_id: requestData?.activity_id ?? activity?.activity_id,
                    title: requestData?.title ?? activity?.title,
                    description: requestData?.description ?? activity?.description,
                    index: requestData?.index ?? activity?.index
                };
                let UpateResult = await updateActivity(requestObject);
                if (!isEmpty(UpateResult)) {
                    return {
                        error: false,
                        message: 'activity updated successful',
                        data: UpateResult
                    };
                } else {
                    return {
                        error: true,
                        message: 'activity is not updated',
                        data: undefined
                    };
                }
            }
        } catch (error) {
            return {
                error: true,
                message: error.message
            };
        }
    },
    /**
     * Update employee details
     * @param {*} requestData
     * @returns
     */
    Update: async (requestData) => {
        try {
            if (isEmpty(requestData)) {
                return {
                    error: true,
                    message: 'employee data is not empty',
                    data: undefined
                };
            }
            if (!requestData?.is_active) {
                return {
                    error: true,
                    message: 'is_active are required fields',
                    data: {}
                };
            } else {
                const employee = await findOneEmployee({
                    employee_id: requestData?.employee_id
                });
                if (isEmpty(employee)) {
                    return {
                        error: true,
                        message: 'employee data is not found',
                        data: undefined
                    };
                }
                let requestObject = {
                    activity_id: requestData?.employee_id ?? employee?.employee_id,
                    name: requestData?.name ?? employee?.name,
                    faceData: requestData?.faceData ?? employee?.faceData
                };
                let UpateResult = await updateEmployee(requestObject);
                if (!isEmpty(UpateResult)) {
                    return {
                        error: false,
                        message: 'employee updated successful',
                        data: UpateResult
                    };
                } else {
                    return {
                        error: true,
                        message: 'employee is not updated',
                        data: undefined
                    };
                }
            }
        } catch (error) {
            return {
                error: true,
                message: error.message,
                data: undefined
            };
        }
    }
};
module.exports = EmployeeController;