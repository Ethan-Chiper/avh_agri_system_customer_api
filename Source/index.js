const express = require('express');
const fileUpload = require('express-fileupload');
const App = express();

App.use(fileUpload());

require('./Models/MultiConnection').establish(App);

// Customer routes
App.use('/api/customer', require('./Routes/CustomerRouters'));

module.exports = App;
