var express = require('express')
var user = require('./routers/user')
var project = require('./routers/project')
// var receiveAddress = require('./routers/receiveAddress')
// var product = require('./routers/products')
// var productParameter = require('./routers/productParameter')
// var order = require('./routers/order')
// var categoryProduct = require('./routers/categoryProduct')
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
    // app.use(bodyParser.json())
    // app.use(router)
app.use(user)
app.use(project)
// app.use(receiveAddress)
// app.use(product)
// app.use(productParameter)
// app.use(order)
// app.use(categoryProduct)
// app.use(category)
app.listen(3000, function() {
    console.log("running");
})