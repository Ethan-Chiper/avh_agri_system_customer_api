const mongoose = require('mongoose');
const Config = require('../App/Config');
const DB_URL = Config.DB_URL;

const MultiDBConnection = {
    /**
     * MongoData Base connection
     * @param {*} Express 
     * @returns 
     */
    establish: async (Express) => {
        console.log('DB_URL.CUSTOMER_URL',DB_URL.CUSTOMER_URL);
        return await new Promise(async (resolve) => {
            let customerDBCheck = false;

            mongoose.set('strictQuery', true);
            try {
                mongoose.connect(DB_URL.CUSTOMER_URL, {
                    serverSelectionTimeoutMS: 30000,
                    socketTimeoutMS: 30000
                    // useNewUrlParser: true,
                    // useUnifiedTopology: true
                });
                console.log(' customer database connection established');
                customerDBCheck = true;
            } catch (error) {
                throw error;
            }
            mongoose.set('debug', true);

            resolve([customerDBCheck]);
        })
            .then(() => {
                Express.listen('1509', () => {
                    console.log('server is running in 1509');
                });
            })
            .catch((error) => {
                throw error;
            });
    },
    getCustomerDBConnection: () => {
        return mongoose;
    }
};
module.exports = MultiDBConnection;
