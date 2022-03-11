let user = require('../userSchema')
const jwt = require('jsonwebtoken'); //token

const Mail = require('../mail.js')
let express = require("express")
let router = express.Router()
    // 账号登录(手机号/用户名)
router.post('/loginAccount', (req, res) => {
    console.log(req.body.account)
    console.log(req.body.password)
        user.find({
            $or: [{
                "username": req.body.account,
                "password": req.body.password
            }, {
                "phone": req.body.account,
                "password": req.body.password
            }]
        }, (err, data) => {
            if (data.length === 0) {
                res.send(data)
            } else {
                let content = {
                    username: data.username
                };
                // 生成token主体
                let token = jwt.sign(content, "supermarett", { expiresIn: 3600 });
                res.json({ data, token: token });
                console.log(data.username)
            }
        })
    })
    // 邮箱登录
router.post('/loginEmail', (req, res) => {
        user.find({ "email": req.body.account }, (err, data) => {
            if (data.length === 0) {
                res.send(data)
            } else {
                let content = {
                    username: data.username
                };
                // 生成token主体
                let token = jwt.sign(content, "supermarett", { expiresIn: 3600 });
                res.json({ data, token: token });
                console.log(data.username)
            }

        })
    })
    //查询用户名是否注册过 
router.get('/checkUsername', (req, res) => {
        user.find({ "username": req.query.username }, (err, data) => {
            if (data.length === 0) {
                res.send("1");
                return
            } else {
                res.send("0")
                return
            }

        })
    })
    //查询手机号是否注册过 
router.get('/checkPhone', (req, res) => {
        user.find({ "phone": req.query.phone }, (err, data) => {
            if (data.length === 0) {
                res.send("1")
                return
            } else {
                res.send("0")
                return
            }

        })
    })
    //查询邮箱是否注册过 
router.get('/checkEmail', (req, res) => {
        user.find({ "email": req.query.email }, (err, data) => {
            if (data.length === 0) {
                res.send("1")
                return
            } else {

                res.send("0")
                return
            }

        })
    })
    // 发送邮件
let codeObj = {}
router.get('/getCode', (req, res) => {
        let mail = req.query.email; //获取数据
        console.log(mail)
        let code = Math.floor(Math.random() * 11000 + 1001);
        codeObj[mail] = code;
        Mail.send(mail, code, (state) => {
            console.log(state)
            res.send("" + state);
        })
    })
    // 注册
router.post("/register", (req, res) => {
    const fields = req.body;
                let s = new user({
                    "username": fields.username,
                    "phone": fields.phone,
                    "email": fields.email,
                    "password": fields.password1,
                    "paypassword": fields.password2,
                    "account": 0,
                    "imgSrc": " ",
                    "level": 0

                });
    s.save((err, data) => {
        console.log(data);
                        if (err) {
                            res.send("faile")
                            return;
                        } else {
                            res.send("success")
                            return;
                        }
                    })
            
        })
    //账户充值
router.post('/changeAccount', (req, res) => {
        user.findOneAndUpdate({ "_id": req.body.id }, { $set: { "account": req.body.account } }, (err, data) => {
            if (err) {
                res.send("error")
            } else {
                res.send("success");
            }
        })
    })
    // 修改头像
router.post('/saveImgsrc', (req, res) => {
        user.findOneAndUpdate({ "_id": req.body.id }, { $set: { "imgSrc": req.body.img } }, (err, data) => {
            if (err) {
                res.send("error")
            } else {
                res.send("success")
            }
        })
    })
    // 修改用户名
router.post('/modifyUsername', (req, res) => {
        user.findOneAndUpdate({ "_id": req.body.id }, { $set: { 'username': req.body.value } }, (err, data) => {
            if (err) {
                res.send("error")
            } else {
                res.send("success");
            }
        })
    })
    // 修改登录密码
router.post('/modifyPassword', (req, res) => {
        user.findOneAndUpdate({ "_id": req.body.id }, { $set: { 'password': req.body.value } }, (err, data) => {
            if (err) {
                res.send("error")
            } else {
                res.send("success");
            }
        })
    })
    // 修改支付密码
router.post('/modifyPayPassword', (req, res) => {
        user.findOneAndUpdate({ "_id": req.body.id }, { $set: { 'paypassword': req.body.value } }, (err, data) => {
            if (err) {
                res.send("error")
            } else {
                res.send("success");
            }
        })
    })
    // 获取所有的用户
router.get('/getAllUser', (req, res) => {
        user.find((err, data) => {
            if (err) {
                res.send("error")
            } else {
                res.send(data)
            }
        })
    })
    // 删除用户
router.get('/deleteUser', (req, res) => {
    console.log(req.query.id)
    user.remove({ "_id": req.query.id }, (err, data) => {
        if (err) {
            res.send("error")
        } else {
            res.send("success");
        }
    })
})
module.exports = router