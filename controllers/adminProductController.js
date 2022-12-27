const adminProductService = require('../model/adminProductService')
const authService = require('../model/authService')

let getProductManage = async (req, res) => {
    const { AVATAR: ava } = await authService.getUserByID(res.locals.user.id);
    //  let idProduct = req.params.id;
    const getProduct = await adminProductService.getAllProduct();
    //console.log(listProduct);
    let listProduct;
    const {
        sortName: sortName,
        sortType: sortType,
        sortNumbuy: sortNumbuy,
        sortCreateon: sortCreateon, 
        sort: sortFilter

    } = req.query;

    if (sortName || sortType || sortNumbuy || sortCreateon || sortFilter) {
        listProduct = await adminProductService.getSortProduct(req.query);
    }
    else listProduct = getProduct;
    const originUrl = `?${req.baseUrl}`;
    return res.render('product-manage.ejs', { ava, listProduct: listProduct, originUrl: originUrl })
}
let getDetailsProduct = async (req, res) => {
    const { AVATAR: ava } = await authService.getUserByID(res.locals.user.id);
    let idUser = req.params.id;
    const details = await adminProductService.getProduct(idUser);

    //console.log(details);

    return res.render('details-product.ejs', { ava, details: details })
}

//SORT PRODUCT-MANAGE
// let getUsersManage = async (req, res) => {
//     const { AVATAR: ava } = await authService.getUserByID(res.locals.user.id);

//     const getUser = await adminUserService.getAllUser();
//     //console.log(list.length);
//     let listUser;
//     const {
//         timeCreate: timeCreate,
//         sortEmail: sortEmail,
//         sortHoTen: sortName,
//         sort: sortFilter

//     } = req.query;
//     if (timeCreate || sortEmail || sortName || sortFilter) {
//         listUser = await adminUserService.getSortUser(req.query);
//     }
//     else listUser = getUser;
//     const originUrl = `?${req.baseUrl}`;
//     return res.render('users-manage.ejs', { listUser: listUser, ava: ava, originUrl: originUrl });
// }
/////////////////

module.exports = {
    getProductManage,
    getDetailsProduct
}