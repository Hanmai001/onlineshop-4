const db = require('../config/connectDB');
const bcrypt = require('bcryptjs');

let getUser = async (idUser) => {
    const result = await db.query('SELECT * FROM user us where IDUSER = ?', [parseInt(idUser)]);
    //console.log(result);
    return result[0];
}
let getAllUser = async () => {
    const result = await db.query('SELECT * FROM user us')
    //console.log(result);
    return result[0];
}
//SORT USER-MANAGE
let getSortUser = async (queryFilter) => {
    const {
        timeCreate: timeCreate,
        sortEmail: sortEmail,
        sortName: sortName,
        sort: sortFilter
    } = queryFilter;
    let values = [];
    let sql = 'SELECT * FROM onlineshop.user';

    if (sortFilter && typeof sortFilter === 'string' && (timeCreate || sortEmail || sortName)) {
        //sort tăng dần
        if (typeof timeCreate === 'string') {
            sql += ' ORDER BY CREATEON';
            values.push(parseInt(timeCreate))
        }
        if (typeof sortEmail === 'string') {
            sql += ' ORDER BY EMAIL';
            values.push(parseFloat(sortEmail))
        }
        else if (typeof sortName === 'string') {
            sql += ' ORDER BY USERNAME';
            values.push(parseInt(timeCreate))
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
    getAllUser,
    getUser,
    getSortUser
}