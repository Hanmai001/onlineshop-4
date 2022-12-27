const adminTypeService = require('../model/adminTypeService')
const authService = require('../model/authService')

let getTypeManage = async (req, res) => {
    const { AVATAR: ava } = await authService.getUserByID(res.locals.user.id);
    const getType = await adminTypeService.getAllType();
    let listType = getType;

    return res.render('type-manage.ejs', { ava, listType: listType })
}

module.exports = {
    getTypeManage
}