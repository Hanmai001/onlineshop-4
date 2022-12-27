const adminOriginService = require('../model/adminOriginService')
const authService = require('../model/authService')

let getOriginManage = async (req, res) => {
    const { AVATAR: ava } = await authService.getUserByID(res.locals.user.id);
    const getManufacturer = await adminOriginService.getAllManufacturer();
    let listOrigin = getManufacturer;


    return res.render('origin-manage.ejs', { ava, listOrigin: listOrigin })
}

module.exports = {
    getOriginManage
}