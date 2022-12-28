const db = require('../config/connectDB');
const bcrypt = require('bcryptjs');

let getProduct = async (idUser) => {
    const result = await db.query('SELECT * FROM product pd, photo pt WHERE pd.IDPRODUCT = pt.IDPRODUCT and pd.IDPRODUCT = ? group by pd.IDPRODUCT HAVING COUNT(*) >= 1', [parseInt(idUser)]);
    //console.log(result);
    return result[0];
}
let getAllProduct = async () => {
    const result = await db.query('SELECT pd.IDPRODUCT,pd.NAMEPRODUCT, tp.NAMETYPE, pd.CREATEON, pd.PRICE, pd.NUMBUY FROM product pd JOIN type tp on tp.IDTYPE = pd.IDTYPE');
    //console.log(result);
    return result[0];
}
//SORT PRODUCT-MANAGE
let getSortProduct = async (queryFilter) => {
    const {
        sortName: sortName,
        sortType: sortType,
        sortNumbuy: sortNumbuy,
        sortCreateon: sortCreateon, 
        sort: sortFilter
    } = queryFilter;
    let values = [];
    let sql = 'SELECT pd.IDPRODUCT,pd.NAMEPRODUCT, tp.NAMETYPE, pd.CREATEON, pd.PRICE, pd.NUMBUY FROM onlineshop.product pd JOIN onlineshop.type tp on tp.IDTYPE = pd.IDTYPE';

    if (sortFilter && typeof sortFilter === 'string' && (sortName || sortType || sortNumbuy || sortCreateon)) {
        //sort tăng dần
        if (typeof sortName === 'string') {
            sql += ' ORDER BY pd.NAMEPRODUCT';
            values.push(parseInt(sortName))
        }
        if (typeof sortType === 'string') {
            sql += ' ORDER BY tp.NAMETYPE';
            values.push(parseFloat(sortType))
        }
        if (typeof sortNumbuy === 'string') {
            sql += ' ORDER BY pd.NUMBUY';
            values.push(parseFloat(sortType))
        }
        else if (typeof sortCreateon === 'string') {
            sql += ' ORDER BY pd.CREATEON';
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
    getAllProduct,
    getProduct,
    getSortProduct
}