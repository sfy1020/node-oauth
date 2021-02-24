const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./db.json');
const db = low(adapter);
db.defaults({users:[]}).write();

module.exports = {
    async getUser(id){
        return await db.get('users').find({id:id}).value()
    },

    async setUser(id, value){
        return await db.get('users').push({id:id, value:value}).write()
    },

    async updateUser(id, value){
        return await db.get('users').find({id:id}).assign({id:id, value:value}).write()
    }
}