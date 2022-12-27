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
    else listOrigin =  getManufacturer;
    const originUrl = `?${req.baseUrl}`;
    return res.render('origin-manage.ejs', { ava, listOrigin: listOrigin, originUrl: originUrl })
}

module.exports = {
    getOriginManage,

}