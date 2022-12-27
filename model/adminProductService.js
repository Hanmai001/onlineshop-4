const db = require('../config/connectDB');
const bcrypt = require('bcryptjs');

let getProduct = async (idUser) => {
    const result = await db.query('SELECT * FROM product pd join PHOTO pt on pt.IDPHOTO = pd.IDPRODUCT where pd.IDPRODUCT = ?', [parseInt(idUser)]);
    //console.log(result);
    return result[0];
}
let getAllProduct = async () => {
    const result = await db.query('SELECT pd.IDPRODUCT,pd.NAMEPRODUCT, tp.NAMETYPE, pd.CREATEON, pd.PRICE, pd.NUMBUY FROM product pd JOIN type tp on tp.IDTYPE = pd.IDTYPE');

    return result[0];
}
module.exports = {
    getAllProduct,
    getProduct
}