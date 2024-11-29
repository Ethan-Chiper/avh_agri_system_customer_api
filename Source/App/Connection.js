const winston = require('winston');
const logger = winston.createLogger({
    transports: [new winston.transports.Console()]
});

const Conection = {
    expressIgniter: (Express) => {
        Express.listen(1508, () => {
            logger.info('server is started on http://localhost:1508');
        });
    }
};

module.exports = Conection;
