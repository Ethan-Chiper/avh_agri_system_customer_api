const winston = require('winston');
const logger = winston.createLogger({
    transports: [new winston.transports.Console()]
});

const Conection = {
    expressIgniter: (Express) => {
        Express.listen(1509, () => {
            logger.info('server is started on http://localhost:1509');
        });
    }
};

module.exports = Conection;
