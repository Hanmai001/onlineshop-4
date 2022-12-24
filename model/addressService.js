const db = require('../config/connectDB');

const findAddress = async (idUser) => {
    const result = await db.query("SELECT IDADDRESS FROM cart WHERE IDUSER = ?", [parseInt(idUser)]);
    return result[0][0].IDADDRESS;
}
const updateAddress = async (idUser, name, address, phone) => {
    const idAddress = await findAddress(idUser);
    if (idAddress) {
        await db.query("UPDATE address SET NAME = ?, ADDRESS = ?, PHONE = ? WHERE IDADDRESS = ?", [name, address, phone, parseInt(idAddress)]);
    }
    else {
        await db.query("INSERT address (IDUSER, NAME, PHONE, ADDRESS) VALUES (?, ?, ?, ?)", [parseInt(idUser), name, address, phone]);
    }
}


module.exports = {
    updateAddress
}