let donate = require('../donateSchema')
let express = require("express")
let router = express.Router()
const project = require('../projectSchema');
    //捐赠
router.post('/addDonate', (req, res) => {
    const fields = req.body.donate;
    // 保存捐赠记录
    let s = new donate ({
    "projectid": fields.projectid,
    "donateuserid": fields.donateuserid,
    "money": fields.money,
    "donateusername": fields.donateusername,
    });
    s.save((err, data) => {
        if (err) {
        res.send("faile")
        return;
        } else {
            res.send("success");

        return;
        }
        })
})


    // 获取每个项目的捐赠明细
router.get('/getAllDonate', (req, res) => {
     donate.find({ "projectid": req.query.projectid},(err, data) => {
            if (err) {
                res.send("error")
            } else {
                res.send(data)
            }
        })
})

    // 获取每个人捐赠明细
router.get('/getDonateByuserid', (req, res) => {
    if (req.query.userid) {
        donate.find({ "donateuserid": req.query.userid }, (err, data) => {
            if (err) {
                res.send("error")
            } else {
                res.send(data)
            }
        })
    } else {
   donate.find( (err, data) => {
            if (err) {
                res.send("error")
            } else {
                res.send(data)
            }
        })       
    }
})

router.get('/getDonateByProjectid', (req, res) => {
    donate.find({ 'projectid': req.query.projectid }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
})
module.exports = router