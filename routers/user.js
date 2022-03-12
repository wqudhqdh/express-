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

    //查询用户名是否注册过 
router.get('/checkUsername', (req, res) => {
    user.find({ "username": req.query.username.toString() }, (err, data) => {
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

    // 编辑用户
router.post('/modifyUser', (req, res) => {
       const users = req.body.user;
        user.findOneAndUpdate({ "_id": users._id }, { $set: { 'username': users.username,"email": users.email,"phone": users.phone } }, (err, data) => {
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
router.post('/delUser', (req, res) => {
    user.remove({ "_id": req.body.user._id }, (err, data) => {
        if (err) {
            res.send("error")
        } else {
            res.send("success");
        }
    })
})
    // 搜索用户
router.get('/searchUser', (req, res) => {
    user.find({ "username": req.query.value}, (err, data) => {
        res.send(data);
    })
})
module.exports = router