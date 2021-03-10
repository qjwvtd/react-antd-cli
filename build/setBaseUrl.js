const path = require('path');
const fs = require("fs");
var value = process.argv.splice(2)[0];
if (!value) {
    console.log('请使用 "npm run setBaseUrl 参数值" 设置请求地址');
    return;
}
//创建webRoot.js文件,把baseUrl写到webRoot中
const context = "//此文件脚本自动注入,禁止手动修改\n" +
    "const webRoot = '" + (value || 'window.location.origin') + "';\n" +
    "export default webRoot;";
fs.writeFile('src/common/http/webRoot.js', context, function (err) {
    if (err) {
        return console.error(err);
    }
});
