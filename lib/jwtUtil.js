const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const {secretKey, options} = require('../config/secretKey');
const constants = require('./constants');

module.exports = {
    sign: async (user) => {

        const payload = {
            id: user.id
        };
        
        const result = {
            token: jwt.sign(payload, secretKey, options),
            refreshToken: uuidv4()
        };
        return result;
    },
    verify: async (token) => {
        let decoded;
        try {
            decoded = jwt.verify(token, secretKey);
            console.log('decoded',decoded);
        } catch (err) {
            if (err.message === 'jwt expired') {
                console.log('expired token');
                return constants.TOKEN_EXPIRED;
            } else if (err.message === 'invalid token') {
                console.log('invalid token');
                return constants.TOKEN_INVALID;
            } else {
                console.log("invalid token");
                return constants.TOKEN_INVALID;
            }
        }
        return decoded;
    }
}