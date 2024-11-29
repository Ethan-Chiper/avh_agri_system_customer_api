const Dotenv = require('dotenv');
Dotenv.config({ path: 'Source/.env.production' });
const environment = process.env;

module.exports = {
    DB_URL: {
        CUSTOMER_URL: environment.CUSTOMER_URL || 'mongodb://localhost:27017/customer'
    }
};
