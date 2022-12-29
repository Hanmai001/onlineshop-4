const adminOriginService = require('../model/adminOriginService')
const authService = require('../model/authService')

let getOriginManage = async (req, res) => {
    const { AVATAR: ava } = await authService.getUserByID(res.locals.user.id);
    const getManufacturer = await adminOriginService.getAllManufacturer();
    //let listOrigin = getManufacturer;

    let listOrigin;
    const {
        sortType: sortType,
        sort: sortFilter

    } = req.query;

    if (sortType || sortFilter) {
        listOrigin = await adminOriginService.getSortManufacturer(req.query);
    }
    else listOrigin = getManufacturer;
    const originUrl = `?${req.baseUrl}`;
    return res.render('origin-manage.ejs', { ava, listOrigin: listOrigin, originUrl: originUrl })
}
let getDetailsOrigin = async (req, res) => {
    const { AVATAR: ava } = await authService.getUserByID(res.locals.user.id);
    let idUser = req.params.id;
    const details = await adminOriginService.getManufacturer(idUser);
    return res.render('details-origin.ejs', { ava, details: details })
}
let updateInformation = async (req, res) => {
    const idorigin = req.params.id;
    const { NAMEMANUFACTURER: namemanufacturer } = await adminOriginService.getManufacturer(idorigin);

    const {
        updateNamemanufacturer: new_namemanufacturer,
    } = req.body;

    //nsole.log(req.body)

    // if (new_phone.length > 11) {
    //     req.flash('updateProfileMsg', 'SĐT phải nhỏ hơn 12 kí tự.');
    //     return res.redirect(`/admin-profile/${idProduct}`);
    // }

    const result = await adminOriginService.updateorigin(req.body, idorigin)
   
    //console.log(res.locals.user); 
    if (result) {
        return res.redirect(`/manage/details-origin/${idorigin}`);
    }
    req.flash('updateProfileMsg', 'Kiểm tra lại thông tin cập nhật.');
    return res.redirect(`/manage/details-origin/${idorigin}`);
}
let getAddOrigin = async (req, res) => {
    const { AVATAR: ava } = await authService.getUserByID(res.locals.user.id);

    return res.render('admin-add-origin.ejs', { ava });
}
module.exports = {
    getOriginManage,
    getDetailsOrigin,
    updateInformation,
    getAddOrigin

}