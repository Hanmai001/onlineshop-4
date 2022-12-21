const db = require('../config/connectDB');

let getAllReview = async (id) => {
    const result = await db.query('SELECT rv.CONTENT, us.FULLNAME, us.AVATAR FROM review rv JOIN user us ON us.IDUSER = rv.IDUSER WHERE rv.IDPRODUCT = ?', [parseInt(id)]);
    //console.log(result[0])
    return result[0];
}
let getReviewPage = async (id, offset, limit) => {
    console.log("id", id);
    const result = await db.query('SELECT rv.CONTENT, us.FULLNAME, us.AVATAR FROM review rv JOIN user us ON us.IDUSER = rv.IDUSER WHERE rv.IDPRODUCT = ? LIMIT ?, ?', [id, offset, limit]);
    //console.log(result[0])
    return result[0];
}

module.exports = {
    getAllReview,
    getReviewPage
}