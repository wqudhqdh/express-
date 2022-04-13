let comment = require('../commentSchema')
let express = require("express")
let router = express.Router()
    // 添加评论
router.post('/addComment', (req, res) => {
    const fields = req.body.comment;
    let s = new comment ({
    "projectid": fields.projectid,
    "userid": fields.userid,
    "content": fields.content,
    });
    s.save((err, data) => {
        if (err) {
        res.send("faile")
        return;
        } else {
        res.send("success")
        return;
        }
        })
})

    // 获取所有的评论
router.get('/getAllComment', (req, res) => {
     comment.find({ "projectid": req.query.projectid},(err, data) => {
            if (err) {
                res.send("error")
            } else {
                res.send(data)
            }
        })
})
module.exports = router