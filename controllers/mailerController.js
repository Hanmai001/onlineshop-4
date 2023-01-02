const nodemailer = require('nodemailer');
const authService = require('../model/authService');

let getMail = async (req, res, next) => {
    const {
        email: mail
    } = req.body

    const msg = {
        from: "tranxuanquang79@gmail.com",
        to: mail,
        subject: "Test sendmail",
        html: '<a href="http://localhost:3000/verify">bấm vào đi đừng sợ</a>'
    };
    console.log(msg);
    nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "tranxuanquang79@gmail.com",
            pass: "acwktshyozykvwzp",
        },
        port: 465,
        host: 'smtp.gmail.com'
    })

        .sendMail(msg, (err) => {
            if (err) {
                req.flash('forgetMessage', 'Lỗi')
                return console.log('Error occurs', err);
            } else {
                return req.flash('forgetMessage', 'Thành công')
                // return res.redirect('/');
            }
        })
    next();
}

let getVerifyEmail = async (req, res) => {

    return res.render('verify-email.ejs');
}


let getForgetEmail = async (req, res) => {
    console.log(req.body)
    const {
        to: mail
    } = req.body
    const idUser = await authService.getUserById(mail);
   // console.log(idUser)
    const msg = {
        from: "tranxuanquang79@gmail.com",
        to: mail,
        subject: "Test sendmail",
        html: `<a href="http://localhost:3000/reset-password?iduser=${idUser.IDUSER}">cccc</a>`
    };
    console.log(msg);
    nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "tranxuanquang79@gmail.com",
            pass: "acwktshyozykvwzp",
        },
        port: 465,
        host: 'smtp.gmail.com'
    })

        .sendMail(msg, (err) => {
            if (err) {
                req.flash('forgetMessage', 'Lỗi')
                return console.log('Error occurs', err);
            } else {

                //return req.flash('forgetMessage', 'Thành công')
                return res.render('confirm.ejs');
            }
        })
}

let getResetPassword = async (req, res) => {

    return res.render('reset-password.ejs');
}

module.exports = {
    getMail,
    getVerifyEmail,
    getForgetEmail,
    getResetPassword
}
