let project = require('../projectSchema')
let express = require("express")
let router = express.Router()
    // 发起求助
router.post('/seekHelp', (req, res) => {
    const fields = req.body.help;
    let s = new project({
    "title": fields.title,
    "phone": fields.phone,
    "imgSrc": fields.fileList,
    "description": fields.description,
    "targetMoney": fields.targetMoney,
        "type": fields.type,
        "userid": fields.userid,
     "username": fields.username
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
// 获取通过审核的求助项目
router.get('/fetchSeekHelpProjectByState', (req, res) => {
    project.find( { "state": 2},(err, data) => {
            if (err) {
                res.send("error")
            } else {
                res.send(data)
            }
        })
})
// 根据项目名搜索项目
router.get('/searchProject', (req, res) => {
    if (req.query.searchValue) {
        project.find({ "title": req.query.searchValue }, (err, data) => {
            if (err) {
                res.send("error")
            } else {
                res.send(data)
            }
        })
    } else {
    project.find((err, data) => {
            if (err) {
                res.send("error")
            } else {
                res.send(data)
            }
        })
    }
})

// 删除项目
router.get('/delProject', (req, res) => {
   project.remove({ "_id": req.query.projectId},(err, data) => {
            if (err) {
                res.send("error")
            } else {
                res.send(data)
            }
        })
})
// 编辑项目
router.post('/editProject', (req, res) => {
    const projects = req.body.project;
   project.findOneAndUpdate({ "_id": projects._id}, { $set: { 'title': projects.title,"phone": projects.phone,"type": projects.type,"description": projects.description,"imgSrc":projects.fileList} },(err, data) => {
       if (err) {
                res.send("error")
            } else {
                res.send(data)
            }
        })
})

// 根据id搜索项目
router.get('/searchProjectById', (req, res) => {
   project.find({ "_id": req.query.projectId},(err, data) => {
            if (err) {
                res.send("error")
            } else {
                res.send(data)
            }
        })
})

// 根据用户id获取发起项目
router.get('/fetchSeekHelpProject', (req, res) => {
    project.find({ "userid": req.query.userid }, (err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    })
})
// 修改已筹款，捐赠人次
router.post('/changeHaveMoneyAndCount', (req, res) => {
    project.findOneAndUpdate({ "_id": req.body._id }, { $set: { 'haveMoney': req.body.haveMoney, 'count': req.body.count } }, {'new': true},(err, data) => {
            if (err) {
                res.send("error")
            } else {
                res.send(data)
            }
        })
})
//修改状态
router.post('/modifyState', (req, res) => {
    project.findOneAndUpdate({ "_id": req.body.project }, { $set: { 'state': req.body.state } }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
})

//修改状态
router.post('/ahditFaileProject', (req, res) => {
    project.findOneAndUpdate({ "_id": req.body.project }, { $set: { 'state': req.body.state ,'reason': req.body.reason} }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
})

router.get('/changeHavedMoney', (req, res) => {
    console.log(req.query.id);
    project.findById({ "_id": req.query.id }, (err, data) => {
        console.log(data);
        const resultMoney = data.havedMoney + req.query.money;
        project.findOneAndUpdate({ '_id': req.query.id }, { $set: { "havedMoney": resultMoney } }, (err, data) => {
            if (err) {
                res.send(err);
            } else {
                res.send(data);
            }
        })
    })
})
module.exports = router