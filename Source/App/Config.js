const Dotenv = require('dotenv');
Dotenv.config({ path: 'Source/.env.production' });
const environment = process.env;

module.exports = {
    DB_URL: {
        CUSTOMER_URL: environment.CUSTOMER_URL || 'mongodb://localhost:27017/customer'
    },
    KONG_URL: {
        KONG: environment.KONG_URL || 'http://192.168.17.24:8001/consumers/'
    }
};
