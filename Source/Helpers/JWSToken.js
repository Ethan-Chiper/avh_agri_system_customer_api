const jwt = require('jsonwebtoken');
const userModel = require('../Models/CustomerModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

let JWSToken = {
    /**
     * GenerateToken
     * @param {*} payload
     * @returns
     */
    GenerateToken: async (payload) => {
        try {
            const token = jwt.sign(payload, process.env.SECRET_KEY);

            return token;
        } catch (error) {
            console.log(error);
        }
    },
    /**
     * VerifyToken
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns
     */
    VerifyToken: async (req, res, next) => {
        try {
            if (!req.headers.authorization) throw new Error('Provide a valid JWT Token');

            const token = req.headers.authorization?.split(' ')[1];

            jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
                if (err) {
                    return res.json({ status: 401, message: 'Invalid Token' });
                } else {
                    let loggedUser = { _id: decoded.user_id };

                    const userExist = await userModel.findOne({
                        _id: new ObjectId(loggedUser._id)
                    });

                    if (!userExist) {
                        return res.json({ status: 401, message: 'UnAuthorized User' });
                    }
                    req.loggedUser = decoded;
                    next();
                }
            });
        } catch (error) {
            return res.json({ status: 401, message: error.message });
        }
    }
};

module.exports = JWSToken;
