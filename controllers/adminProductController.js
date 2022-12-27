const adminProductService = require('../model/adminProductService')
const authService = require('../model/authService')

let getProductManage = async (req, res) => {
    const { AVATAR: ava } = await authService.getUserByID(res.locals.user.id);
    //  let idProduct = req.params.id;
    const listProduct = await adminProductService.getAllProduct();
    //console.log(listProduct);
    return res.render('product-manage.ejs', { ava, listProduct: listProduct })
}
let getDetailsProduct = async (req, res) => {
    const { AVATAR: ava } = await authService.getUserByID(res.locals.user.id);
    let idUser = req.params.id;
    const details = await adminProductService.getProduct(idUser);

    //console.log(details);

    return res.render('details-product.ejs', { ava, details: details })
}

module.exports = {
    getProductManage,
    getDetailsProduct
}