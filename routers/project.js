let project = require('../projectSchema')
let express = require("express")
let router = express.Router()
    // 发起求助
router.post('/seekHelp', (req, res) => {
    const fields = req.body.help;
    let s = new project({
    "title": fields.title,
    "phone": fields.phone,
    "fetchList": fields.fileList,
    "description": fields.description,
    "type": fields.type,
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
// 获取所有的求助项目
router.get('/fetchAllSeekHelpProject', (req, res) => {
   project.find((err, data) => {
            if (err) {
                res.send("error")
            } else {
                res.send(data)
            }
        })
})
// 根据项目名搜索项目
router.get('/searchProject', (req, res) => {
   project.find({ "title": req.query.searchValue},(err, data) => {
            if (err) {
                res.send("error")
            } else {
                res.send(data)
            }
        })
})

module.exports = router