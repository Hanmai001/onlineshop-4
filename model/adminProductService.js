const db = require('../config/connectDB');
const bcrypt = require('bcryptjs');

let getProduct = async (idUser) => {
    const result = await db.query('SELECT pd.*, br.NAMEBRAND, manu.NAMEMANUFACTURER, mt.NAMEMATERIAL, pt.LINK  FROM product pd JOIN photo pt ON pt.IDPRODUCT = pd.IDPRODUCT JOIN brand br ON br.IDBRAND = pd.IDBRAND JOIN manufacturer manu ON manu.IDMANUFACTURER = pd.IDMANUFACTURER JOIN material mt ON mt.IDMATERIAL = pd.IDMATERIAL WHERE pd.IDPRODUCT = ?', [parseInt(idUser)]);
    //console.log(result);
    return result[0];
}
let getAllProduct = async () => {
    const result = await db.query('SELECT pd.IDPRODUCT,pd.NAMEPRODUCT, tp.NAMETYPE, pd.CREATEON, pd.PRICE, pd.NUMBUY FROM product pd JOIN type tp on tp.IDTYPE = pd.IDTYPE');
    //console.log(result);
    return result[0];
}
let updateProduct = async (data, ava, idUser) => {
    const {
        updateFullname: fullname,
        updateEmail: email,
        updatePhone: phone,
        updateSex: sex
    } = data;
    let values = [];
    let sql = "UPDATE user SET ";
    if (ava) {
        sql += " AVATAR = ? ";
        values.push(ava);
    }
    if (fullname) {
        if (ava) sql += ", ";
        sql += "FULLNAME = ? ";
        values.push(fullname);
    }
    if (email) {
        if (ava || fullname) sql += ", ";
        sql += "EMAIL = ? ";
        values.push(email);
    }
    if (phone) {
        if (ava || fullname || email) sql += ", ";
        sql += "PHONE = ? ";
        values.push(phone);
    }
    if (sex && sex === "female") {
        if (ava || fullname || email || phone) sql += ", ";
        sql += "SEX = ? ";
        values.push(`Nữ`);
    }
    else if (sex && sex === "male") {
        if (ava || fullname || email || phone) sql += ", ";
        sql += "SEX = ? ";
        values.push(`Nam`);
    }
    else if (sex && sex === "sexOther") {
        if (ava || fullname || email || phone) sql += ", ";
        sql += "SEX = ? ";
        values.push(`Khác`);
    }
    sql += "WHERE IDUSER = ?";
    values.push(parseInt(idUser));
    let result;
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

module.exports = {
    getAllProduct,
    getProduct,
    getSortProduct
}