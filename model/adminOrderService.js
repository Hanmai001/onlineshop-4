const db = require('../config/connectDB');
const bcrypt = require('bcryptjs');

let getAllOrder = async () => {
    const result = await db.query('SELECT IDORDER, STATUSODER, CREATEON FROM onlineshop.order');

    return result[0];
}

//SORT ORDER-MANAGE
let getSortOrder = async (queryFilter) => {
    const {
        sortId: sortId,
        sortStatus: sortStatus,
        sortCreateon: sortCreateon, 
        sort: sortFilter
    } = queryFilter;
    let values = [];
    let sql = 'SELECT * FROM onlineshop.order';

    if (sortFilter && typeof sortFilter === 'string' && (sortId || sortStatus  || sortCreateon)) {
        //sort tăng dần
        if (typeof sortId === 'string') {
            sql += ' ORDER BY IDORDER';
            values.push(parseInt(sortId))
        }
        if (typeof sortStatus === 'string') {
            sql += ' ORDER BY STATUSODER';
            values.push(parseFloat(sortStatus))
        }
        else if (typeof sortCreateon === 'string') {
            sql += ' ORDER BY CREATEON';
            values.push(parseInt(sortCreateon))
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
    getAllOrder,
    getSortOrder
}