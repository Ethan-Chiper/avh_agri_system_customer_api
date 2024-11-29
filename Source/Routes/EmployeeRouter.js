/* eslint-disable no-unused-vars */
const Express = require('express');
const Router = Express.Router();
const { Create, List, Details, Update } = require('../Controllers/EmployeeController');
const { isEmpty } = require('../Helpers/Utils');
const { VerifyToken } = require('../Helpers/JWSToken');
const { sendFailureMessage, sendSuccessData } = require('../App/Responder');
const { validationResult } = require('express-validator');
const { createEmployeeValidation, UpdateStatus } = require('../Validators/EmployeeValidation');

Router.post('/create', createEmployeeValidation(), async (request, response) => {
    try {
        let hasErrors = validationResult(request);
        if (hasErrors.isEmpty()) {
            let { error, message, data } = await Create(request?.body);
            if (!isEmpty(data) && error === false) {
                return sendSuccessData(response, message, data);
            }
            return sendFailureMessage(response, message, 422);
        } else {
            return sendFailureMessage(response, hasErrors?.errors[0]?.msg, 422);
        }
    } catch (error) {
        return sendFailureMessage(response, error, 500);
    }
});

Router.get('/list/:employeeId?', async (request, response) => {
    try {
        let { error, message, data } = await List(request?.query, request?.params?.employeeId);
        if (!isEmpty(data) && error === false) {
            return sendSuccessData(response, message, data);
        }
        return sendFailureMessage(response, message, 400);
    } catch (error) {
        return sendFailureMessage(response, error, 500);
    }
});

Router.get('/detail/:employeeId?', async (request, response) => {
    try {
        let { error, message, data } = await Details(request?.params?.employeeId);
        if (!isEmpty(data) && error === false) {
            return sendSuccessData(response, message, data);
        }
        return sendFailureMessage(response, message, 400);
    } catch (error) {
        return sendFailureMessage(response, error, 500);
    }
});

Router.patch('/update', UpdateStatus, VerifyToken, async (request, response) => {
    try {
        let hasError = validationResult(request);
        if (hasError.isEmpty()) {
            let { error, message, data } = await Update(request?.body);
            if (!isEmpty(data) && error === false) {
                return sendSuccessData(response, message, data);
            }
            return sendFailureMessage(response, message, 400);
        } else {
            return sendFailureMessage(response, hasError?.errors[0]?.msg, 422);
        }
    } catch (error) {
        return sendFailureMessage(response, error, 500);
    }
});

module.exports = Router;
