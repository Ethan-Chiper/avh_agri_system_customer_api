/* eslint-disable no-unused-vars */
const Express = require('express');
const App = Express();
let helmet = require('helmet');
const cors = require('cors');
App.use(cors());
App.use(helmet.hidePoweredBy());
const bodyParser = require('body-parser');
App.use(bodyParser.json());
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
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

// Swagger configuration
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Node.js CRUD API',
            version: '1.0.0',
            description: 'A simple CRUD API documented using Swagger',
        },
        servers: [
            {
                url: 'http://192.168.17.24:1509',
                description: 'Local server',
            },
        ],
    },
    apis: ['./Swagger/*.js'],
};
// Initialize Swagger docs
const swaggerDocs = swaggerJsdoc(swaggerOptions);
console.log(JSON.stringify(swaggerDocs, null, 2));
App.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Other middleware
App.use(Express.urlencoded({ extended: true }));

/******************************************************************************* */
App.use('/api/customer', require('./Routes/CustomerRouter'));
App.use('/api/employee', require('./Routes/EmployeeRouter'));
// App.use('/api/attendance', require('./Routes/AttendanceRouter'));
/******************************************************************************* */
require('./Models/MultiConnection').establish(App);

module.exports = App;
