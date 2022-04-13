let news = require('../newsSchema')
let express = require("express")
let router = express.Router()
    // 添加新闻
router.post('/addNews', (req, res) => {
    const fields = req.body.news;
    let s = new news ({
    "title": fields.title,
    "imgSrc": fields.fileList,
    "description": fields.description,
    "abstract": fields.abstract,
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
// 获取所有新闻
router.get('/fetchAllNews', (req, res) => {
   news.find((err, data) => {
            if (err) {
                res.send("error")
            } else {
                res.send(data)
            }
        })
})
// 根据title搜索新闻
router.get('/searchNews', (req, res) => {
    if (req.query.searchValue) {
           news.find({ "title": req.query.searchValue},(err, data) => {
            if (err) {
                res.send("error")
            } else {
                res.send(data)
            }
        })
    } else {
           news.find((err, data) => {
            if (err) {
                res.send("error")
            } else {
                res.send(data)
            }
        })
    }

})

// 根据id搜索新闻
router.get('/searchNewsById', (req, res) => {
   news.find({ "_id": req.query.searchValue},(err, data) => {
            if (err) {
                res.send("error")
            } else {
                res.send(data)
            }
        })
})

// 删除新闻
router.get('/delNews', (req, res) => {
   news.remove({ "_id": req.query.newId},(err, data) => {
            if (err) {
                res.send("error")
            } else {
                res.send(data)
            }
        })
})
// 编辑新闻
router.post('/editNews', (req, res) => {
    const newss = req.body.news;
    console.log(newss);
    news.findOneAndUpdate({ "_id": newss._id }, { $set: { 'title': newss.title, "description": newss.description,  "abstract": newss.abstract ,"imgSrc": newss.fileList,} }, {"new":true},(err, data) => {
       if (err) {
                res.send("error")
            } else {
                res.send(data)
            }
        })
})

module.exports = router