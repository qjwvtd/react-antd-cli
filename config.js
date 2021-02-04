const path = require('path');
const packJson = require('./package.json');
//http/https接口请求地址
const baseUrl = "https://saas-dev.dhwork.cn";
//热更新目录<开发环境目录>
const hot_update_dirname = path.resolve(__dirname, 'public');
//输出目录<生产环境构建目录>
const dist_dirname = path.resolve(__dirname, 'dist');
//工作目录<源代码>
const workPath = path.resolve(__dirname, 'src');
//入口文件
const entry = path.resolve(__dirname, 'src/app.js');
module.exports = {
    baseUrl: baseUrl,
    name: '智安汇运营后台',
    version: packJson.version,
    entry: entry,
    src: workPath,
    hot: hot_update_dirname,
    dist: dist_dirname,
    //开发环境配置,同webpack配置一样
    dev: {
        path: hot_update_dirname,
        publicPath: '/',
        host: "localhost",
        port: 2333,
        proxy: {
            /*代理跨域,*同webpack-dev-server的proxy设置一样,axios, fetch, jquery中的请求路径不能拼接root, 不能设置baseUrl地址*/
            '/api': {
                target: baseUrl, //被代理的请求地址
                changeOrigin: true, //跨域
                secure: true, //如果是https，会有安全校验，设置secure为false
                pathRewrite: { '^/api': '/api' }//重写根路径
            }
        }
    }
};
