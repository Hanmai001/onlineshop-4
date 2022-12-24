const productService = require('../model/productService');
const reviewService = require('../model/reviewService');
const authService = require('../model/authService');
const cartService = require('../model/cartService');
const Paginator = require("paginator");

let getDetailProductPage = async (req, res) => {
    const paginator = new Paginator(5, 5);
    const id = req.params.id;
    let ava = null, numProductInCart = null, idCart = null;
    if (res.locals.user) {
        const { AVATAR } = await authService.getUserByID(res.locals.user.id);
        if (AVATAR) ava = AVATAR;
        idCart = await cartService.findCartUser(res.locals.user.id);
        numProductInCart = await cartService.numProductInCart(idCart);
    }
    const product = await productService.getDetailProduct(id);
    const relateProducts = await productService.getRelatedProducts(id);

    let currentPage = req.query.page ? +req.query.page : 1;
    const length = (await reviewService.getAllReview(id)).length;
    const pagination_info = paginator.build(length, currentPage);
    let iterator = (currentPage - 5) < 1 ? 1 : currentPage - 4;
    let endingLink = (iterator + 4) <= pagination_info.total_pages ? (iterator + 4) : currentPage + (pagination_info.total_pages - currentPage);

    //console.log(pagination_info.total_pages ,iterator, endingLink)
    const review = await reviewService.getReviewPage(id, 0, 5);
    //console.log(product)

    return res.render('product-info.ejs', { idCart, numProductInCart, product: product, relateProducts: relateProducts, review: review, ava, pagination_info, iterator, endingLink });
}
let getListOrderPage = async (req, res) => {
    let totalAmount, totalPrice;
    const idCart = await cartService.findCartUser(res.locals.user.id);
    const numProductInCart = await cartService.numProductInCart(idCart);
    const result = await productService.getChosenOrderTotal(idCart);
    if (result) {
        totalAmount = result.TOTALAMOUNT;
        totalPrice = result.TOTALPRICE;
    }
    const { AVATAR: ava } = await authService.getUserByID(res.locals.user.id);
    const listOrders = await productService.getListOrders(idCart);
    //console.log(listOrders)
    return res.render('list-order.ejs', { ava, totalAmount, totalPrice, numProductInCart, listOrders });
}
let getPaymentPage = async (req, res) => {
    const idCart = await cartService.findCartUser(res.locals.user.id);
    const { AVATAR: ava } = await authService.getUserByID(res.locals.user.id);
    const listOrders = await productService.getListChosenOrders(idCart);
    const totalPrice = await cartService.calTotalPriceChosenProducts(idCart);
    return res.render('payment.ejs', { ava, listOrders, totalPrice });
}
module.exports = {
    getDetailProductPage,
    getListOrderPage,
    getPaymentPage
}