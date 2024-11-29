const Express = require('express');
const Router = Express.Router();
// const { createActivity, list, detail, update, deleteActivity } = require('../Controller/ActivityController');
const { isEmpty } = require('../Helpers/Utils');
const { VerifyToken, GenerateToken } = require('../Helpers/JWSToken');
const { sendFailureMessage, sendSuccessData } = require('../App/Responder');

Router.post('/create', async (request, response) => {
    try {
            let { error, message, data } = await createActivity(request?.body);
            if (!isEmpty(data) && error === false) {
                return sendSuccessData(response, message, data);
            }
            return sendFailureMessage(response, message, 422);
    } catch (error) {
        return sendFailureMessage(response, error, 500);
    }
});

module.exports = Router;
