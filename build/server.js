
var http = require("http");
var express = require('express');
var cors = require('cors');
var app = express();
var port = 3000;
// 处理跨域
app.use(cors({
    orgin: 'localhost:' + port
}));
// 接口
app.get('/api/project', function (req, res) {
    // 定义列表
    var project = { id: 1, name: '双江口项目', address: '马尔康大渡河上源足木足河与绰斯甲河汇口处以下2 km河段' };
    res.json(project);
})
//服务
app.listen(port, function () {
    console.log('server is started success,listening on port:' + port);
});
