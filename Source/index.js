const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const dotenv = require('dotenv');
const environment = process.env.NODE_ENV || 'production';
const envPath = path.resolve(__dirname, `.env.${environment}`);
dotenv.config({ path: envPath });
const baseURL = process.env.BASE_URL;
const apiURL = `${baseURL}/api`;
console.log('===baseURL', baseURL);
console.log('===apiURL', apiURL);

const App = express();

App.use(fileUpload());

require('./Models/MultiConnection').establish(App);

// Face5 routes Start
App.use('/api/customer', require('./Routes/CustomerRouters'));

module.exports = App;
