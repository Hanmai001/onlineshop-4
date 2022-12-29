const db = require('../config/connectDB');
const bcrypt = require('bcryptjs');

let getProduct = async (idUser) => {
    const result = await db.query('SELECT * FROM product pd JOIN photo pt ON pt.IDPRODUCT = pd.IDPRODUCT JOIN brand br ON br.IDBRAND = pd.IDBRAND JOIN manufacturer manu ON manu.IDMANUFACTURER = pd.IDMANUFACTURER JOIN material mt ON mt.IDMATERIAL = pd.IDMATERIAL WHERE pd.IDPRODUCT = ?', [parseInt(idUser)]);
    //console.log(result);
    return result[0];
}
let getAllProduct = async () => {
    const result = await db.query('SELECT pd.IDPRODUCT,pd.NAMEPRODUCT, tp.NAMETYPE, pd.CREATEON, pd.PRICE, pd.NUMBUY FROM product pd JOIN type tp on tp.IDTYPE = pd.IDTYPE');
    //console.log(result);
    return result[0];
}
let updateProduct = async (data, idProduct) => {
    const {
        updateNameproduct: nameproduct,
        updatePrice: price,
        updateNumbuy: numbuy,
        updateStatusproduct: statusproduct,
        updateRemain: remain
    } = data;
    let values = [];
    let sql = "UPDATE product SET ";
    // if (ava) {
    //     sql += " LINK = ? ";
    //     values.push(ava);
    //  }
    if (nameproduct) {
        // /*if (ava)*/ sql += ", ";
        sql += "NAMEPRODUCT = ? ";
        values.push(nameproduct);
    }
    if (price) {
        if (/*ava ||*/ nameproduct) sql += ", ";
        sql += "PRICE = ? ";
        values.push(price);
    }
    if (numbuy) {
        if (/*ava ||*/ nameproduct || price) sql += ", ";
        sql += "NUMBUY = ? ";
        values.push(numbuy);
    }
    if (statusproduct) {
        if (/*ava ||*/ nameproduct || price || numbuy) sql += ", ";
        sql += "STATUSPRODUCT = ? ";
        values.push(statusproduct);
    }
    if (remain) {
        if (/*ava ||*/ nameproduct || price || numbuy || statusproduct) sql += ", ";
        sql += "REMAIN = ? ";
        values.push(remain);
    }
    sql += "WHERE IDPRODUCT = ?";
    values.push(parseInt(idProduct));
    let result;
    console.log(sql);
    try {
        result = await db.query(sql, values);
    } catch (err) {
        return null;
    }

    return result[0] && result.length > 0;
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
// let getProductByID = async (id) => {
//     const result = await db.query('select NAMEPRODUCT, PRICE, NUMBUY, STATUSPRODUCT, REMAIN from product where IDPRODUCT = ? limit 1', [id]);
//     return result[0][0];
// }
module.exports = {
    getAllProduct,
    getProduct,
    getSortProduct,
    updateProduct
    // getProductByID
}