const adminProductService = require('../model/adminProductService')
const adminOriginService = require('../model/adminOriginService')
const adminTypeService = require('../model/adminTypeService')

const authService = require('../model/authService')
const Paginator = require("paginator");
const qs = require('qs');

const getPagination = (page, size) => {
    const limit = size ? +size : 5;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};

let getProductManage = async (req, res) => {
    const paginator = new Paginator(5, 5);
    const { AVATAR: ava } = await authService.getUserByID(res.locals.user.id);
    //  let idProduct = req.params.id;
    const allProduct = await adminProductService.getAllProduct();
    let listProduct = allProduct;
    let pagination_info;
    let currentPage = req.query.page ? +req.query.page : 1;
    let length = allProduct.length;
    const {
        sortName: sortName,
        sortType: sortType,
        sortNumbuy: sortNumbuy,
        sortCreateon: sortCreateon,
        sort: sortFilter

    } = req.query;
    const {
        page, ...withoutPage
    } = req.query;
    if (sortName || sortType || sortNumbuy || sortCreateon || sortFilter) {
        listProduct = await adminProductService.getSortProduct(req.query);
        length = listProduct.length;
        pagination_info = paginator.build(length, currentPage);
        if (currentPage < 1) currentPage = 1;
        else if (currentPage > pagination_info.total_pages) currentPage = pagination_info.total_pages;
        const { limit, offset } = getPagination(currentPage - 1, req.query.size);
        listProduct = await adminProductService.getSortProductPage(req.query, offset, limit);
    }
    else {
        pagination_info = paginator.build(length, currentPage);
        if (currentPage < 1) currentPage = 1;
        else if (currentPage > pagination_info.total_pages) currentPage = pagination_info.total_pages;
        const { limit, offset } = getPagination(currentPage - 1, req.query.size);
        listProduct = await adminProductService.getProductPage(offset, limit);
    }
    let iterator = (currentPage - 5) < 1 ? 1 : currentPage - 4;
    let endingLink = (iterator + 4) <= pagination_info.total_pages ? (iterator + 4) : currentPage + (pagination_info.total_pages - currentPage);
    let originUrl = `${req.baseUrl}?${qs.stringify(withoutPage)}`;
    originUrl = originUrl.replaceAll("&amp;", "&");

    return res.render('product-manage.ejs', { ava, listProduct, originUrl, pagination_info, iterator, endingLink })
}

let getDetailsProduct = async (req, res) => {
    const { AVATAR: ava } = await authService.getUserByID(res.locals.user.id);
    let idUser = req.params.id;
    const details = await adminProductService.getProduct(idUser);
    //  console.log(details);

    return res.render('details-product.ejs', { ava, details: details })
}
let updateInformation = async (req, res) => {
    const idProduct = req.params.id;
    const { NAMEPRODUCT: nameproduct, PRICE: price, NUMBUY: numbuy, STATUSPRODUCT: statusproduct, REMAIN: remain, LINK: link } = await adminProductService.getProduct(idProduct);
    let new_link = link;
    if (req.file) {
        new_link = '/images/' + req.file.filename;
    }
    const {
        updateNameproduct: new_nameproduct,
        updatePrice: new_price,
        updateNumbuy: new_numbuy,
        updateStatusproduct: new_statusproduct,
        updateRemain: new_remain,
    } = req.body;

    //nsole.log(req.body)

    // if (new_phone.length > 11) {
    //     req.flash('updateProfileMsg', 'SĐT phải nhỏ hơn 12 kí tự.');
    //     return res.redirect(`/admin-profile/${idProduct}`);
    // }

    const result = await adminProductService.updateProduct(req.body, link, idProduct)
    //console.log(res.locals.user); 

    if (result) {
        return res.redirect(`/manage/details-product/${idProduct}`);
    }
    req.flash('updateProfileMsg', 'Kiểm tra lại thông tin cập nhật.');
    return res.redirect(`/manage/details-product/${idProduct}`);
}
let deleteInformation = async (req, res) => {
    const idProduct = req.params.id;

    const result = await adminProductService.deleteProduct(idProduct)

    if (result) {
        return res.redirect(`/product-manage`);
    }
    req.flash('updateProfileMsg', 'Kiểm tra lại thông tin cập nhật.');
    return res.redirect(`/product-manage`);
}
let getAddProduct = async (req, res) => {
    const { AVATAR: ava } = await authService.getUserByID(res.locals.user.id);
    const origin = await adminOriginService.getAllManufacturer();
    const type = await adminTypeService.getAllType();
    const brand = await adminProductService.getAllBrand();
    const material = await adminProductService.getAllMaterial();



    return res.render('admin-add-product.ejs', { ava, origin: origin, type: type, brand: brand, material: material });
}
let addInformation = async (req, res) => {
    //const idProduct = req.params.id;
    //  const { NAMEPRODUCT: nameproduct, PRICE: price, NUMBUY: numbuy, STATUSPRODUCT: statusproduct, REMAIN: remain } = await adminProductService.getProduct(idProduct);

    const {
        addNameproduct: addNameproduct,
        addPrice: addPrice
    } = req.body;

    // console.log(addNameproduct)

    // if (new_phone.length > 11) {
    //     req.flash('updateProfileMsg', 'SĐT phải nhỏ hơn 12 kí tự.');
    //     return res.redirect(`/admin-profile/${idProduct}`);
    // }
    const result = await adminProductService.addProduct(req.body)
    //console.log(res.locals.user); 

    if (result) {
        return res.redirect(`/admin-add-product`);
    }
    req.flash('updateProfileMsg', 'Kiểm tra lại thông tin cập nhật.');
    return res.redirect(`/admin-add-product`);
}
module.exports = {
    getProductManage,
    getDetailsProduct,
    updateInformation,
    deleteInformation,
    getAddProduct,
    addInformation
}