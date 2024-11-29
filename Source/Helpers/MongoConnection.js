/* eslint-disable no-prototype-builtins */
/* eslint-disable security/detect-object-injection */
/* eslint-disable node/exports-style */
const MongoConnection = () => {
	let mongoose;
	mongoose = require('mongoose');
	exports.create = () => {
		let key, mongoMulti, value;
		mongoMulti = new mongoose.Mongoose();
		for (key in mongoose) {
			value = mongoose[key];
			if (!(mongoMulti[key] != undefined) && mongoose.hasOwnProperty(key)) {
				mongoMulti[key] = value;
			}
		}
		return mongoMulti;
	};
};
MongoConnection.call(MongoConnection);
