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
let caculateRevenue1 = async () => {
    let result;
    result = await db.query('SELECT sum(TOTALPRICE) as sum FROM onlineshop.myorder WHERE MONTH(CREATEON) <= 3 AND MONTH(CREATEON) >= 1 AND (STATUSORDER = "Đang giao"  OR  STATUSORDER = "Đã giao")');
    //console.log(result);
    return result[0];
}
let caculateRevenue2 = async () => {
    let result;
    result = await db.query('SELECT sum(TOTALPRICE) as sum FROM onlineshop.myorder WHERE MONTH(CREATEON) <= 6 AND MONTH(CREATEON) >= 4 AND (STATUSORDER = "Đang giao"  OR  STATUSORDER = "Đã giao")');
    //console.log(result);
    return result[0];
}
let caculateRevenue3 = async () => {
    let result;
    result = await db.query('SELECT sum(TOTALPRICE) as sum FROM onlineshop.myorder WHERE MONTH(CREATEON) <= 9 AND MONTH(CREATEON) >= 7 AND (STATUSORDER = "Đang giao"  OR  STATUSORDER = "Đã giao")');
    //console.log(result);
    return result[0];
}
let caculateRevenue4 = async () => {
    let result;
    result = await db.query('SELECT sum(TOTALPRICE) as sum FROM onlineshop.myorder WHERE MONTH(CREATEON) <= 12 AND MONTH(CREATEON) >= 10 AND (STATUSORDER = "Đang giao"  OR  STATUSORDER = "Đã giao")');
    //console.log(result);
    return result[0];
}
let caculateProduct = async () => {
    let result;
    result = await db.query('select distinct pd.NAMEPRODUCT, pd.PRICE, po.AMOUNT, pd.PRICE * po.AMOUNT as mul from product pd join product_order po on po.IDPRODUCT = pd.IDPRODUCT ORDER BY mul desc');
    //console.log(result);
    return result[0];
}

module.exports = {
    updateProfile,
    updatePassword,
    caculateRevenue1,
    caculateRevenue2,
    caculateRevenue3,
    caculateRevenue4,
    caculateProduct
}