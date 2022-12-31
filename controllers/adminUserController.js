const adminUserService = require('../model/adminUserService')
const authService = require('../model/authService')


//SORT USER-MANAGE
let getUsersManage = async (req, res) => {
    const { AVATAR: ava } = await authService.getUserByID(res.locals.user.id);

    const getUser = await adminUserService.getAllUser();
    //console.log(list.length);
    let listUser;
    const {
        timeCreate: timeCreate,
        sortEmail: sortEmail,
        sortHoTen: sortName,
        sort: sortFilter

    } = req.query;
    if (timeCreate || sortEmail || sortName || sortFilter) {
        listUser = await adminUserService.getSortUser(req.query);
    }
    else listUser = getUser;
    const originUrl = `?${req.baseUrl}`;
    return res.render('users-manage.ejs', { listUser: listUser, ava: ava, originUrl: originUrl });
}
/////////////////

let getDetailsUser = async (req, res) => {
    const { AVATAR: ava } = await authService.getUserByID(res.locals.user.id);
    let idUser = req.params.id;
    const details = await adminUserService.getUser(idUser);

    //console.log(details);

    return res.render('details-user.ejs', { ava, details: details })
}
let banUser = async (req, res) => {
    const idUser = req.params.id;

    const result = await adminUserService.ban(idUser);

    if (result) {
        return res.redirect(`/users-manage`);
    }
    req.flash('updateProfileMsg', 'Kiểm tra lại thông tin cập nhật.');
    return res.redirect(`/users-manage`);
}
let unbanUser = async (req, res) => {
    const idUser = req.params.id;

    const result = await adminUserService.unban(idUser);

    if (result) {
        return res.redirect(`/users-manage`);
    }
    req.flash('updateProfileMsg', 'Kiểm tra lại thông tin cập nhật.');
    return res.redirect(`/users-manage`);
}
module.exports = {
    getUsersManage,
    getDetailsUser,
    banUser,
    unbanUser

}