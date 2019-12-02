
var path = require('path');
var express = require('express');
var app = express();
var port = 3000;
//定位静态资源到web目录
var root = __dirname.replace('build', 'bundle');
app.use(express.static(path.join(root)));
//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
//服务
app.listen(port, function () {
    console.log('Server listening on port:', port);
});
