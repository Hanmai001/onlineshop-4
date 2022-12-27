const db = require('../config/connectDB');
const bcrypt = require('bcryptjs');

let getAllOrder = async () => {
    const result = await db.query('SELECT IDORDER, STATUSODER, CREATEON FROM onlineshop.order');

    return result[0];
}
module.exports = {
    getAllOrder
}