const Express = require('express');
const Router = Express.Router();
const { Create } = require('../Controllers/CustomerController');
const { isEmpty } = require('../Helpers/Utils');
// const { VerifyToken } = require('../Helpers/JWSToken');
const { sendFailureMessage, sendSuccessData } = require('../App/Responder');

// Use VerifyToken as middleware without invoking it
Router.post('/create', async (request, response) => {
    console.log();
    try {
        let { error, message, data } = await Create(request?.body);
        if (!isEmpty(data) && error === false) {
            return sendSuccessData(response, message, data);
        }
        return sendFailureMessage(response, message, 422);
    } catch (error) {
        return sendFailureMessage(response, error, 500);
    }
});

module.exports = Router;
