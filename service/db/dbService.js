const userDB = require('./lowdbService');

module.exports = {
    async getUser(id){
        let result = await userDB.getUser(id);
        console.log(`getUser:${id},`, result);
        return result;
    },

    async setUser(id, value){
        let result = await userDB.setUser(id, value);
        console.log(`setUser:${id},`, result);
        return result
    },

    async updateUser(id, value){
        let result = await userDB.updateUser(id, value);
        console.log(`updateUser:${id},`, result);
        return result
    }
}