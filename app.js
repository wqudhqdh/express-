var express = require('express')
var user = require('./routers/user')
var project = require('./routers/project')
var news = require('./routers/news')
var comment = require('./routers/comment')
var reply = require('./routers/reply')
var donate = require('./routers/donate')
var remit = require('./routers/remit')
// var category = require('./routers/category')
var bodyParser = require('body-parser')
var app = express()
    //解决跨域问题
    // var cors = require('cors');
    //开启
app.use(express.static('./express项目/public'))
    // app.use(cors)
    // 配置使用模板引擎
app.engine('html', require('express-art-template'))
app.use(bodyParser.json({ limit: '2100000kb' }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(user)
app.use(project)
app.use(news)
app.use(comment)
app.use(reply)
app.use(donate)
app.use(remit)
// app.use(category)
app.listen(3000, function() {
    console.log("running");
})