function Responder() {
    this.sendFailureMessage = (res, message, code, httpCode = 400) => {
        let result = {};
        res.setHeader('content-type', 'application/json');
        res.status(httpCode);
        result.success = false;
        result.message = message;
        result.code = code != null ? code : 'failure';
        res.end(JSON.stringify(result));
    };
    this.sendSuccessMessage = (res, message, httpCode = 200) => {
        let result = {};
        res.setHeader('content-type', 'application/json');
        res.status(httpCode);
        result.success = true;
        result.message = message;
        res.end(JSON.stringify(result));
    };
    this.sendSuccessData = (res, message, data, httpCode = 200) => {
        let result = {};
        res.setHeader('content-type', 'application/json');
        res.status(httpCode);
        result.success = true;
        result.message = message;
        result.data = data;
        res.end(JSON.stringify(result));
    };
}
module.exports = new Responder();
