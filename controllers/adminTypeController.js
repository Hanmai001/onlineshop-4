const adminTypeService = require('../model/adminTypeService')
const authService = require('../model/authService')

let getTypeManage = async (req, res) => {
    const { AVATAR: ava } = await authService.getUserByID(res.locals.user.id);
    const getType = await adminTypeService.getAllType();
    //let listType = getType;

    let listType;
    const {
        sortType: sortType,
        sort: sortFilter

    } = req.query;

    if (sortType || sortFilter) {
        listType = await adminTypeService.getSortType(req.query);
    }
    else listType = getType;
    const originUrl = `?${req.baseUrl}`;
    return res.render('type-manage.ejs', { ava, listType: listType, originUrl: originUrl })
}
let getDetailsType = async (req, res) => {
    const { AVATAR: ava } = await authService.getUserByID(res.locals.user.id);
    let idUser = req.params.id;
    const details = await adminTypeService.getType(idUser);
    //console.log(details);

    return res.render('details-type.ejs', { ava, details: details })

}
module.exports = {
    getTypeManage,
    getDetailsType
}