const { check } = require('express-validator');

const Validate = {
    /**
     * List Validation
     * @returns
     */
    listValidation: () => {
        return [
            check('employee_name', 'please enter the employee_name').notEmpty({
                ignore_whitespace: true
            })
        ];
    },
    /**
     * Create employee
     * @returns
     */
    createEmployeeValidation: () => {
        return [check('employee_name', 'please enter the employee_name').notEmpty().trim()];
    },
    /**
     * Update Status
     * @returns
     */
    UpdateStatus: () => {
        return [check('is_active', 'please enter is_active field').notEmpty().trim()];
    },
    detailValidation: () => {
        return [
            check('employee_id', 'please enter the employee_id').notEmpty({
                ignore_whitespace: true
            })
        ];
    }
};
module.exports = Validate;
