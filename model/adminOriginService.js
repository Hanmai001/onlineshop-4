const db = require('../config/connectDB');
const bcrypt = require('bcryptjs');

let getAllManufacturer = async () => {
    const result = await db.query('SELECT * FROM manufacturer');

    return result[0];
}
module.exports = {
    getAllManufacturer
}