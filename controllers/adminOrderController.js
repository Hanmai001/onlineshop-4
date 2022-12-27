const adminOrderService = require('../model/adminOrderService')
const authService = require('../model/authService')

let getOdersManage = async (req, res) => {
    const { AVATAR: ava } = await authService.getUserByID(res.locals.user.id);
    const getOrder = await adminOrderService.getAllOrder();
    let listOrder = getOrder;
    console.log(listOrder);

    return res.render('orders-manage.ejs', { ava, listOrder: listOrder })
}

module.exports = {
    getOdersManage
}