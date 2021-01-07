
var path = require('path');
var express = require('express');
var cors = require('cors');
var app = express();
// 处理跨域
app.use(cors({
    orgin: 'localhost:3000'
}));

// 获取用户接口
app.get('/api/project', function (req, res) {
    // 定义用户列表
    var project = { id: 1, name: '双江口项目', desc: '关于双江口项目的一些描述' };
    res.json(project);
})
//服务
app.listen(3000, function () {
    console.log('server is started success,listening on port:' + 3000);
});
