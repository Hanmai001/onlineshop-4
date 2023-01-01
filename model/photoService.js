const db = require('../config/connectDB');

const addPhotos = async(pics_product, idProduct) => {
    const length = pics_product.length;
    for (let i = 0; i < length; i++)
        await db.query("INSERT INTO photo (IDPRODUCT, LINK) VALUES (?, ?)", [parseInt(idProduct), pics_product[i]]);
}

module.exports = {
    addPhotos
}