const Express = require('express');
const App = Express();
let helmet = require('helmet');
const cors = require('cors');
App.use(cors());
App.use(helmet.hidePoweredBy());
const bodyParser = require('body-parser');
App.use(bodyParser.json());
App.use((request, response, next) => {
    const originalSend = response.send;
    response.send = function (body) {
        if (response.locals.middlewareApplied) {
            originalSend.apply(response, arguments);
            return next();
        }
        response.locals.middlewareApplied = true;
        originalSend.apply(response, arguments);
    };

    next();
});

/******************************************************************************* */
App.use('/api/customer', require('./Routes/CustomerRouter'));
App.use('/api/employee', require('./Routes/EmployeeRouter'));
// App.use('/api/attendance', require('./Routes/AttendanceRouter'));
/******************************************************************************* */
require('./Models/MultiConnection').establish(App);

module.exports = App;
