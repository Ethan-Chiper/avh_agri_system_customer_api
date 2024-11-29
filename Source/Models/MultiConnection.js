const mongoose = require('mongoose');
const Config = require('../App/Config');
const DB_URL = Config.DB_URL;

const MultiDBConnection = {
    establish: async (Express) => {
        return await new Promise(async (resolve) => {
            let productDBCheck = false;

            mongoose.set('strictQuery', true);
            try {
                mongoose.connect(DB_URL.CUSTOMER_URL, {
                    serverSelectionTimeoutMS: 30000,
                    socketTimeoutMS: 30000
                    // useNewUrlParser: true,
                    // useUnifiedTopology: true
                });
                console.log(' customer database connection established');
                productDBCheck = true;
            } catch (error) {
                throw error;
            }
            mongoose.set('debug', true);

            resolve([productDBCheck]);
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
    getProductDBConnection: () => {
        return mongoose;
    }
};
module.exports = MultiDBConnection;
