const db = require('../config/connectDB');
const bcrypt = require('bcryptjs');

let getAllManufacturer = async () => {
    const result = await db.query('SELECT * FROM manufacturer');

    return result[0];
}
let getManufacturer = async (idUser) => {
    const result = await db.query('SELECT * FROM manufacturer where IDMANUFACTURER = ?', [parseInt(idUser)]);

    return result[0];
}
//SORT ORIGIN-MANAGE
let getSortManufacturer = async (queryFilter) => {
    const {
        sortType: sortType,
        sort: sortFilter
    } = queryFilter;
    let values = [];
    let sql = 'SELECT * FROM onlineshop.manufacturer';

    if (sortFilter && typeof sortFilter === 'string' && (sortType)) {
        //sort tăng dần
        if (typeof sortType === 'string') {
            sql += ' ORDER BY NAMEMANUFACTURER';
            values.push(parseInt(sortType))
        }
        //sort giảm dần
        if (sortFilter === 'down') {
            sql += ' DESC';
        }
    }
    const result = await db.query(sql, values);
    return result[0];

}

module.exports = {
    getAllManufacturer,
    getSortManufacturer,
    getManufacturer
}