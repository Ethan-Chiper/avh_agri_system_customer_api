const { createEmployee, findEmployee, findOneEmployee, updateEmployee } = require('../Repository/Employeerepository');
const { isEmpty, getNanoId, dateFinder, generateOTP } = require('../Helpers/Utils');
const dotenv = require('dotenv');
dotenv.config({ path: 'Source/.env.production' });
const environment = process.env;

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: environment.EMAIL_USER,
        pass: environment.EMAIL_PASS
    }
});

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
                    message: 'employee_name fields are required',
                    data: {}
                };
            }
            let requestObject = {
                employee_id: getNanoId(),
                employee_name: requestData?.employee_name,
                faceData: requestData?.faceData ?? '',
                email: requestData?.email ?? ''
            };

            let Employee = await createEmployee(requestObject);
            console.log('Employee', Employee);
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
            if (query?.employee_name) queryObject['employee_name'] = query?.employee_name;
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
                    employee_name: requestData?.employee_name ?? employee?.employee_name,
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
    },

    Notification: async (requestData) => {
        try {
            let requestObject = {};
            if (isEmpty(requestData)) {
                return {
                    error: true,
                    message: 'employee data is not empty',
                    data: undefined
                };
            }
            if (!requestData?.email) {
                return {
                    error: true,
                    message: 'Email ID is required',
                    data: undefined
                };
            }
            if (requestData?.email) requestObject['email'] = requestData?.email;
            let employeeData = await findEmployee(requestObject);
            if (isEmpty(employeeData)) {
                return {
                    error: true,
                    message: 'Employee list is not found',
                    data: undefined
                };
            }
            // Prepare email options
            const mailOptions = {
                to: requestData?.email,
                subject: 'Alert message',
                html: `
                <div style="text-align: center; margin-top: 20px;">
                    <img src="cid:ollatvImage" alt="OllaTV Logo" style="width: 150px; height: auto; border-radius: 5px;">
                </div>
                <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 400px; border: 1px solid #ddd; border-radius: 10px; margin: 20px auto; background-color: #f9f9f9;">
                    <h2 style="text-align: center; color: #333;">Your Message</h2>
                    <p style="text-align: center; color: #555; font-size: 16px;">Please follow this section:</p>
                    <div style="text-align: center; margin: 20px 0; padding: 15px; border: 1px solid #ccc; border-radius: 5px; background-color: #fff; font-size: 24px; font-weight: bold; color: #333;">
                        ${requestData?.message}
                    </div>
                    <p style="text-align: center; color: #888; font-size: 14px;">This code is valid for 15 minutes.</p>
                </div>`
            };

            // Send OTP via email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return {
                        error: true,
                        message: 'Failed to send OTP email',
                        data: null
                    };
                } else {
                    console.log('Email sent successfully:', info.response);
                    return {
                        error: false,
                        message: 'Email sent successfully',
                        data: undefined
                    };
                }
            });
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
