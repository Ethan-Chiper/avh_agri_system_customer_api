let mongoose = require('mongoose');

exports.create = () => {
    let key, mongeese, value;
    mongeese = new mongoose.Mongoose();
    for (key in mongoose) {
        if (mongoose.hasOwnProperty(key)) {
            value = mongoose[key];
            if (!mongeese[key]) {
                mongeese[key] = value;
            }
        }
    }
    return mongeese;
};
