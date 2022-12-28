const db = require('../config/connectDB');
const bcrypt = require('bcryptjs');

let getAllType = async () => {
    const result = await db.query('select * from type');

    return result[0];
}

//SORT TYPE-MANAGE
let getSortType = async (queryFilter) => {
    const {
        sortType: sortType,
        sort: sortFilter
    } = queryFilter;
    let values = [];
    let sql = 'SELECT * FROM onlineshop.type';

    if (sortFilter && typeof sortFilter === 'string' && (sortType)) {
        //sort tăng dần
        if (typeof sortType === 'string') {
            sql += ' ORDER BY NAMETYPE';
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
let getType = async (idUser) => {
    const result = await db.query('SELECT * FROM type where IDTYPE = ?', [parseInt(idUser)]);

    return result[0];
}
module.exports = {
    getAllType,
    getSortType,
    getType
}