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
let updateInformation = async (req, res) => {
    const idProduct = req.params.id;
    const { NAMEPRODUCT: nameproduct, PRICE: price, NUMBUY: numbuy, STATUSPRODUCT: statusproduct, REMAIN: remain } = await adminProductService.getProduct(idProduct);

    const {
        updateNameproduct: new_nameproduct,
        updatePrice: new_price,
        updateNumbuy: new_numbuy,
        updateStatusproduct: new_statusproduct,
        updateRemain: new_remain
    } = req.body;

    //nsole.log(req.body)

    // if (new_phone.length > 11) {
    //     req.flash('updateProfileMsg', 'SĐT phải nhỏ hơn 12 kí tự.');
    //     return res.redirect(`/admin-profile/${idProduct}`);
    // }

    const result = await adminProductService.updateProduct(req.body, idProduct)
    //console.log(res.locals.user); 

    if (result) {
        return res.redirect(`/manage/details-product/${idProduct}`);
    }
    req.flash('updateProfileMsg', 'Kiểm tra lại thông tin cập nhật.');
    return res.redirect(`/manage/details-product/${idProduct}`);
}
let deleteInformation = async (req, res) => {
    const idProduct = req.params.id;
    const { NAMEPRODUCT: nameproduct, PRICE: price, NUMBUY: numbuy, STATUSPRODUCT: statusproduct, REMAIN: remain } = await adminProductService.getProduct(idProduct);

    const {
        updateNameproduct: new_nameproduct,
        updatePrice: new_price,
        updateNumbuy: new_numbuy,
        updateStatusproduct: new_statusproduct,
        updateRemain: new_remain
    } = req.body;

    //nsole.log(req.body)

    // if (new_phone.length > 11) {
    //     req.flash('updateProfileMsg', 'SĐT phải nhỏ hơn 12 kí tự.');
    //     return res.redirect(`/admin-profile/${idProduct}`);
    // }
    const result = await adminProductService.deleteProduct(req.body, idProduct)
    //console.log(res.locals.user); 

    if (result) {
        return res.redirect(`/product-manage`);
    }
    req.flash('updateProfileMsg', 'Kiểm tra lại thông tin cập nhật.');
    return res.redirect(`/product-manage`);
}
let getAddProduct = async (req, res) => {
    const { AVATAR: ava } = await authService.getUserByID(res.locals.user.id);

    return res.render('admin-add-product.ejs', { ava });
}
module.exports = {
    getProductManage,
    getDetailsProduct,
    updateInformation,
    deleteInformation,
    getAddProduct
}