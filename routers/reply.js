let reply = require('../replySchema')
let express = require("express")
let router = express.Router()
    // 回复
router.post('/addReplyComment', (req, res) => {
    const fields = req.body.reply;
    let s = new reply ({
    "projectid": fields.projectid,
    "userid": fields.userid,
    "content": fields.content,
    "belongid": fields.belongid,
    "replyuserid": fields.replyuserid,
    "replyusername": fields.replyusername,
    "replyimgSrc": fields.replyimgsrc,
    "username": fields.username,
    });
    s.save((err, data) => {
        if (err) {
            res.send(err);
        return;
        } else {
        res.send("success")
        return;
        }
        })
})

    // 获取所有的回复
router.get('/getAllReply', (req, res) => {
     reply.find({ "projectid": req.query.projectid},(err, data) => {
            if (err) {
                res.send("error")
            } else {
                res.send(data)
            }
        })
})

router.get('/searchReplyByid', (req, res) => {
     reply.find({ "replyuserid ": req.query.id},(err, data) => {
            if (err) {
                res.send("error")
            } else {
                res.send(data)
            }
        })
})
module.exports = router