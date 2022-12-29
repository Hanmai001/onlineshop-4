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
    console.log(details);

    return res.render('details-product.ejs', { ava, details: details })
}
// let updateInformation = async (req, res) => {
//     const idUser = req.params.id;
//     const { EMAIL: email, FULLNAME: fullname, SEX: sex, PHONE: phone, AVATAR: ava } = await authService.getUserByID(idUser);
//     let new_ava = ava;
//     if (req.file) {
//         new_ava = '/images/' + req.file.filename;
//     }
//     const {
//         updateFullname: new_fullname,
//         updateEmail: new_email,
//         updatePhone: new_phone,
//         updateSex: new_sex
//     } = req.body;

//     //console.log(req.body)

//     if (new_phone.length > 11) {
//         req.flash('updateProfileMsg', 'SĐT phải nhỏ hơn 12 kí tự.');
//         return res.redirect(`/admin-profile/${idUser}`);
//     }

//     const result = await adminService.updateProfile(req.body, new_ava, idUser);
//     //console.log(res.locals.user); 
//     if (result) {
//         return res.redirect(`/admin-profile/${idUser}`);
//     }
//     req.flash('updateProfileMsg', 'Kiểm tra lại thông tin cập nhật.');
//     return res.redirect(`/admin-profile/${idUser}`);

// }
module.exports = {
    getProductManage,
    getDetailsProduct,
   // updateInformation
}