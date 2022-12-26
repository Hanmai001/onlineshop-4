const db = require('../config/connectDB');

const creatOrder = async (idUser, idAddress, totalPrice) => {
    await db.query("INSERT myorder (IDUSER, IDADDRESS, STATUSORDER, TOTALPRICE) VALUES (?, ?, 'Đang chờ xác nhận', ?)", [idUser, idAddress, totalPrice]);
}
const addToProductOrder = async (idProduct, idOrder, amount) => {
    await db.query("INSERT product_order (IDPRODUCT, IDORDER, AMOUNT) VALUES (?, ?, ?)", [parseInt(idProduct), parseInt(idOrder), amount]);
}
const getLastestIdOrder = async (idUser) => {
    const result = await db.query("SELECT IDORDER FROM myorder WHERE IDUSER = ?", [parseInt(idUser)]);
    return result[0];
}
module.exports = {
    creatOrder,
    addToProductOrder,
    getLastestIdOrder
}