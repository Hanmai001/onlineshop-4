const db = require('../config/connectDB');
const bcrypt = require('bcryptjs');

let updateProfile = async (data, ava, idUser) => {
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
let updatePassword = async (data, idUser) => {
    const {
        curPass,
        newPass,
        confPass
    } = data;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPass, salt);
    let result;
    try {
        result = await db.query("UPDATE user SET PASSWORD = ? WHERE IDUSER = ?", [hash, parseInt(idUser)]);
    } catch (err) {
        return null;
    }

    return result[0] && result.length > 0;

}
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
////////////////////
// let getProduct = async (idProduct) => {
//     const result = await db.query('SELECT pd.NAMEPRODUCT, tp.NAMETYPE, pd.CREATEON, pd.PRICE, pd.NUMBUY FROM product pd JOIN type tp on tp.IDTYPE = pd.IDTYPE where pd.IDPRODUCT = ?', [parseInt(idProduct)]);

//     return result[0];
// }
let getAllProduct = async () => {
    const result = await db.query('SELECT pd.IDPRODUCT,pd.NAMEPRODUCT, tp.NAMETYPE, pd.CREATEON, pd.PRICE, pd.NUMBUY FROM product pd JOIN type tp on tp.IDTYPE = pd.IDTYPE');

    return result[0];
}
let getAllOrder = async () => {
    const result = await db.query('SELECT IDORDER, STATUSODER, CREATEON FROM onlineshop.order');

    return result[0];
}
let getAllManufacturer = async () => {
    const result = await db.query('SELECT * FROM manufacturer');

    return result[0];
}
let getAllType = async () => {
    const result = await db.query('select * from type');

    return result[0];
}
module.exports = {
    updateProfile,
    updatePassword,
    getAllUser,
    getUser,
    getSortUser,
    //getProduct
    getAllProduct,
    getAllOrder,
    getAllManufacturer,
    getAllType
}