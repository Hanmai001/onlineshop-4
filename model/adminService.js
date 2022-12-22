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
module.exports = {
    updateProfile,
    updatePassword,
    getAllUser,
    getUser
}