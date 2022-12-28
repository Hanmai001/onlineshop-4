const adminOrderService = require('../model/adminOrderService')
const authService = require('../model/authService')

let getOdersManage = async (req, res) => {
    const { AVATAR: ava } = await authService.getUserByID(res.locals.user.id);
    const getOrder = await adminOrderService.getAllOrder();
    //let listOrder = getOrder;
    //console.log(listOrder);
    let listOrder;
    const {
        sortId: sortId,
        sortStatus: sortStatus,
        sortCreateon: sortCreateon,
        sort: sortFilter
    } = req.query;

    if (sortId || sortStatus || sortCreateon || sortFilter) {
        listOrder = await adminOrderService.getSortOrder(req.query);
    }
    else listOrder = getOrder;
    const originUrl = `?${req.baseUrl}`;
    return res.render('orders-manage.ejs', { ava, listOrder: listOrder, originUrl: originUrl })
}
let getDetailsOrder = async (req, res) => {
    const { AVATAR: ava } = await authService.getUserByID(res.locals.user.id);
    let idUser = req.params.id;

    const details = await adminOrderService.getOrder(idUser);
    return res.render('details-order.ejs', { ava, details: details })
}
module.exports = {
    getOdersManage,
    getDetailsOrder
}