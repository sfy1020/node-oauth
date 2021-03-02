const jwt = require('../lib/jwtUtil');
let db = require('./db/dbService');
const constants = require('../lib/constants');

module.exports = {
    signin : async ( req, res ) => {

    let id = req.params.id;
    const user = await db.getUser(id);
    
    const jwtToken = await jwt.sign(user);
    return res.status(constants.statusCode.SUCCESS).send({
            token: jwtToken.token
        })
    },

    verifyToken: async (req, res, next) => {
        let token = req.headers.authorization;
        
        if (!token)
            return res.status(constants.statusCode.BAD_REQUEST).send({msg:'EMPTY_TOKEN'});

        // decode
        const user = await jwt.verify(token);
        console.log('Token Status',user);
        
        if (user === constants.TOKEN_EXPIRED){
            return res.status(constants.statusCode.UNAUTHORIZED).send({msg:'EXPIRED_TOKEN'});
        }

        if (user === constants.TOKEN_INVALID){
            return res.status(constants.statusCode.UNAUTHORIZED).send({msg:'INVALID_TOKEN'});
        }

        if (user.id === undefined){
            return res.status(constants.statusCode.UNAUTHORIZED).send({msg:'INVALID_TOKEN'});
        }

        req.id = user.id;
        
        next();
    }
}