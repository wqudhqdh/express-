let remit = require('../remitSchema')
let express = require("express")
let router = express.Router()

router.post('/saveremit', (req, res) => {
    const fields = req.body;
    let s = new remit({
    "projectid": fields.projectid,
    "projectname": fields.projectname,
    "userid": fields.userid,
    "username": fields.username,
    "money": fields.money,
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

router.get('/fetchRemit', (req, res) => {
    if (req.query.userid) {
       remit.find({ 'userid': req.query.userid }, (err, data) => {
        if (err) {
            res.send(err);
            return;
        } else {
            res.send(data);
            return;
        }
    })
    } else {
        remit.find((err, data) => {
              if (err) {
            res.send(err);
            return;
        } else {
            res.send(data);
            return;
        }
        })
    }

})

router.get('/fetchRemitbyproject', (req, res) => {
       remit.find({'projectid':req.query.projectid }, (err, data) => {
        if (err) {
            res.send(err);
            return;
        } else {
            res.send(data);
            return;
        }
    })

})


router.get('/fetchRemitbyprojectName', (req, res) => {
    console.log(req.query.name);
       remit.find({'projectname':req.query.name }, (err, data) => {
        if (err) {
            res.send(err);
            return;
        } else {
            res.send(data);
            return;
        }
    })

})

router.get('/changeRemitState', (req, res) => {
    remit.findOneAndUpdate({ "_id": req.query.id }, { $set: { 'state': req.query.type } }, (err, data) => {
        if (err) {
            res.send(err)
        }
        else {
            res.send(data);
        }
    })
})

module.exports = router