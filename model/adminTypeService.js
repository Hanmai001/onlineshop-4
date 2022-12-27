const db = require('../config/connectDB');
const bcrypt = require('bcryptjs');

let getAllType = async () => {
    const result = await db.query('select * from type');

    return result[0];
}

module.exports = {
    getAllType
}