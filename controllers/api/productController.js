const productService = require('../../model/productService');
const cartService = require('../../model/cartService');

const updateProductPriceInListOrder = async (req, res) => {
    const {idProduct, amount} = req.query;
    //console.log(idProduct, amount)
    const result = await productService.calProductsPrice(idProduct, amount);
    res.status(200).json(result);
}
const updateProductInPayment = async (req, res) => {
    const {idProduct, checkOrder} = req.query;
    const idCart = await cartService.findCartUser(res.locals.user.id);
    await productService.updateCheckOrder(idProduct, idCart, checkOrder);

    const {totalAmount, totalPrice} = await updateTotalOrder(idCart);
    res.status(200).json({totalAmount: totalAmount ? totalAmount : 0, totalPrice: totalPrice ? totalPrice : 0});
}
const updateTotalOrder = async (idCart) => {
    let totalAmount, totalPrice;
    const result = await productService.getChosenOrderTotal(idCart);

    if (result) {
        totalAmount = result.TOTALAMOUNT;
        totalPrice = result.TOTALPRICE;
    }
    return {totalAmount, totalPrice};
}
const deleteItemInCart = async (req, res) => {
    const {id} = req.params;
    const idCart = await cartService.findCartUser(res.locals.user.id);
    await productService.deleteFromCart(idCart, id);
    res.status(200).json(true);
}

module.exports = {
    updateProductPriceInListOrder,
    updateProductInPayment,
    deleteItemInCart
}