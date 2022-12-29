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
let updateInformation = async (req, res) => {
    const idOrder = req.params.id;
    const { STATUSORDER: statusorder } = await adminOrderService.getOrder(idOrder);

    const {
        updateStatusorder: new_statusorder,
    } = req.body;

    //nsole.log(req.body)

    // if (new_phone.length > 11) {
    //     req.flash('updateProfileMsg', 'SĐT phải nhỏ hơn 12 kí tự.');
    //     return res.redirect(`/admin-profile/${idProduct}`);
    // }

    const result = await adminOrderService.updateorder(req.body, idOrder)
   
    //console.log(res.locals.user); 
    if (result) {
        return res.redirect(`/manage/details-order/${idOrder}`);
    }
    req.flash('updateProfileMsg', 'Kiểm tra lại thông tin cập nhật.');
    return res.redirect(`/manage/details-order/${idOrder}`);
}
module.exports = {
    getOdersManage,
    getDetailsOrder,
    updateInformation
}